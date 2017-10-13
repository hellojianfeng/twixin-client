import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChangedData, ChangeType, ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ContactService } from "./contact.service";

@Component({
  selector: "gr-contacts",
	moduleId: module.id,
	templateUrl: "./contacts.component.html",
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
			"/home",
			];
		}

	public onItemTap(args) {
		const index = args.index;
	}

	public onShowAddFriend() {
		this.router.navigate([
			"/home",
			{ outlets: { contactoutlet: ["contact-addfriend"] } },
			]);
	}

	public onAddGroup() {
		this.router.navigate([
			"/home",
			{ outlets: { contactoutlet: ["addgroup"] } },
			]);
	}

}
