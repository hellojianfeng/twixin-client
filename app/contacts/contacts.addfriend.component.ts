import { Component, OnInit } from "@angular/core";
import { ContactService } from "./contact.service";

import { User } from "../shared";
import { BackendService } from "../shared";

import * as colorModule from "tns-core-modules/color";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/concatAll";
import "rxjs/add/operator/map";
import "rxjs/add/operator/reduce";

import { BehaviorSubject, Subject } from "rxjs";
import { Observable } from "rxjs/Observable";

import { SearchBar } from "ui/search-bar";

import { EventData } from "data/observable";
import { NavigationButton } from "ui/action-bar";
import { Page } from "ui/page";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { resetActionbarItems } from "../shared/utils/actionbar-util";


@Component({
	selector: "tx-contacts-addfriend",
	moduleId: module.id,
	templateUrl: "./contacts.addfriend.component.html",
	styleUrls: ["./contacts.addfriend.component.css"],
})

export class ContactsAddFriendComponent implements OnInit {
	public searchResults;
	public isCleared = false;
	public pendings;
	public newContact: User;
	public contacts: any[] = [];
	public navback;
	public searchTerm$ = new Subject<string>();
	public showSearchResult = false;
	public invitedContacts;

	public constructor(
		private $Contact: ContactService,
		private $PageRoute: PageRoute,
		private $RouterExtensions: RouterExtensions,
		) {
			this.newContact = new User();
			const that = this;
			this.$Contact.searchUsers(this.searchTerm$)
      .subscribe(
				(results) => {
				if (that.isCleared) {
					that.showSearchResult = false;
					that.isCleared = false;
				} else {
					that.showSearchResult = true;
				}

				const invited = [];
				that.invitedContacts.forEach( o => {
					invited.push(o.user._id);
				})

        that.searchResults = results.filter( o => {
					if(invited.indexOf(o._id)===-1){
						return true;
					} else {
						return false;
					}
				}).map( o => {
					return {user: o}
				})
				},
				(error) => {
					const e = error.json();
					alert(e.message);
				},
			);
		}

	public ngOnInit(): void {
		const that = this;
		//this.pendings = this.$Contact.listContactUser({status: ContactService.status_pending_friend});
		//this.invitedContacts = this.$Contact.listContactUser({status: ContactService.status_invited});
		
		this.$Contact.listContactUser({status: ContactService.status_pending_friend})
		.switchMap( results => {
			that.pendings = results;
			return this.$Contact.listContactUser({status: ContactService.status_invited});
		}).subscribe (
			(results) => {
				that.invitedContacts = results;
				that.contacts = that.pendings.concat(that.invitedContacts);
			},
			(error) => {
				const e = error.json();
				alert(e.message);
			},
	);
	}

	onTapBackButton(): void {
		// this.$RouterExtensions.backToPreviousPage();
		this.$RouterExtensions.navigate([
			"/contacts"
			]);
	}

	onTextChange(args) {
		let searchBar = <SearchBar>args.object;
	 	this.searchTerm$.next(searchBar.text);
	 }

	onClear(args){
		this.isCleared = true;
	}

	public onInviteFriend(event, contact) {
		// console.log('this.space.uid:', this.space.uid);

		contact.status = ContactService.status_invited;
		/*this.searchResults.forEach(o => {
			if(o.user.id == contact.user.id){
				o = contact;
			}
		});
		return this.searchResults;*/
		const Color = colorModule.Color;

		this.$Contact.addContactUser(contact).subscribe(
			() => {
				let btn = event.object;
				btn.isEnabled = false;
				btn.backgroundColor = new Color("grey");
				btn.text = "Invited";
			},
			(error) => {
        const e = error.json();
        alert(e.message);
    },
		);
	}

	public onConfirmFriend(event, contact) {
		// console.log('this.space.uid:', this.space.uid);

		contact.status = ContactService.status_confirmed;

		this.$Contact.addContactUser(contact).subscribe(
			() => {
				let btn = event.object;
				btn.isEnabled = false;
				btn.backgroundColor = new colorModule.Color("grey");
				btn.text = "Confirmed";
			},
			(error) => {
        const e = error.json();
        alert(e.message);
    },
		);
	}

}
