import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChangedData, ChangeType, ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ContactService } from "./contact.service";

@Component({
  selector: "tx-contacts",
	moduleId: module.id,
	templateUrl: "./contacts.component.html",
	styleUrls: ["./contacts-common.css"],
})

export class ContactsComponent implements OnInit {
	public contacts;
	public navback;

	public constructor(
		private routerExtensions: RouterExtensions,
		private router: Router,
		private contactService: ContactService,
	){}

	public ngOnInit(): void {
		this.contacts = this.contactService.list();
		this.navback = [
			"/tabs",
			];
		}

	public onItemTap(args) {
		const index = args.index;
	}

	public onShowAddFriend() {
		this.router.navigate([
			"/tabs",
			{ outlets: { contactoutlet: ["contacts-addfriend"] } },
			]);
	}

	public onAddGroup() {
		this.router.navigate([
			"/tabs",
			{ outlets: { contactoutlet: ["addgroup"] } },
			]);
	}

}
