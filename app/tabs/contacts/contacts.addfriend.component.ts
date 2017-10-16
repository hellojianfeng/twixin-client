import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ContactService } from "./contact.service";

import { User } from "../../shared";

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

@Component({
	selector: "tx-contacts-addfriend",
	moduleId: module.id,
	templateUrl: "./contacts.addfriend.component.html"
})

export class ContactsAddFriendComponent implements OnInit {
	public searchResults;
	public newContact: User;
	public contacts: any[];
	public navback;

	public constructor(
		private $Contact: ContactService,
		private $router: RouterExtensions,
		private page: Page,
		){
			this.newContact = new User();
			this.navback = [
				"/tabs",
				{ outlets: { contactoutlet: ["contact"] } },
				];
		}

	public ngOnInit(): void {

	}

	public onSearch(args) {
		const searchBar = args.object as SearchBar;
		const searchValue = searchBar.text.toLowerCase();

		if (searchValue !== "") {
			this.$Contact.searchUser(searchValue).subscribe(
				(res) => {
					this.searchResults = res.map( o => {
						return {user: o};
					});
				},
				(error) => {
					const e = error.json();
					alert(e.message);
				},
			);
		}
	}

	public onInviteFriend(contact){
		// console.log('this.space.uid:', this.space.uid);
		this.$Contact.addContactUser(contact.user).subscribe(
			() => {
				contact.status = "invited";
			},
			(error) => {
        const e = error.json();
        alert(e.message);
    },
		);
	}

}
