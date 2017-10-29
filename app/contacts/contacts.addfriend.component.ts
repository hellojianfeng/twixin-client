import { Component, OnInit } from "@angular/core";
import { ContactService } from "./contact.service";

import { User } from "../shared";
import { BackendService } from "../shared";

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
	public actionItems = [
		{
				icon: "res://BackArrow-Small",
				ios: {position: "left"},
				nav: ["/tabs", { outlets: { contactoutlet: ["contacts-addfriend"]}}]
		}
	];

	public constructor(
		private $Contact: ContactService,
		private $PageRoute: PageRoute,
		private $RouterExtensions: RouterExtensions,
		) {
			this.newContact = new User();
			this.navback = [
				"/tabs",
				{ outlets: { contactoutlet: ["contact"] } },
			];
			const that = this;
			this.$Contact.searchUsers(this.searchTerm$)
      .subscribe(
				(results) => {
				if(that.isCleared){
					that.showSearchResult = false;
					that.isCleared = false;
				} else {
					that.showSearchResult = true;
				}
				
        that.searchResults = results.map( o => {
					// if(o.id != BackendService.me._id)
					// {//not invole self
						return {user: o};
					// }
				});
				},
				(error) => {
					const e = error.json();
					alert(e.message);
				},
			);
		}

	public ngOnInit(): void {
		const that = this;
		this.$Contact.listContactUser({status: ContactService.status_pending_friend}).subscribe(
			results => {
				that.pendings = results;
			},
			error => {
				const e = error.json();
				alert(e.message);
			}
		)
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

		this.$Contact.addContactUser(contact).subscribe(
			() => {
				let btn = event.object;
				btn.isEnabled = false;
				btn.backgroundColor = "black";
				btn.text = "Invited";
			},
			(error) => {
        const e = error.json();
        alert(e.message);
    },
		);
	}

}
