import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChangedData, ChangeType, ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ContactService } from "./contact.service";

@Component({
  selector: "tx-contacts-add-group",
	moduleId: module.id,
	templateUrl: "./contacts.addgroup.component.html",
	styleUrls: ["./contacts-common.css"],
})

export class ContactsAddGroupComponent implements OnInit {
	public contacts;
	public navback;
	public item1;
	public title = "Contacts";

	public constructor(
		private routerExtensions: RouterExtensions,
		private router: Router,
		private contactService: ContactService,
	) {}

	public ngOnInit(): void {
		this.contactService.listContactUser().subscribe(
			(results) => this.contacts = results,
			(error) => {
				return error;
			}
		);
	}

	public onItemTap(args) {
		const index = args.index;
	}

}
