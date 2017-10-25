import { Component, OnInit } from "@angular/core";

import { User } from "../shared";
import { BackendService } from "../shared";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/concatAll";
import "rxjs/add/operator/map";
import "rxjs/add/operator/reduce";

import { BehaviorSubject, Subject } from "rxjs";
import { Observable } from "rxjs/Observable";

import { EventData } from "data/observable";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { LoginService, alert } from "../shared";
import { ResetActionbarItemsDirective } from "../shared/directives/reset-actionbar-items.directive";


@Component({
	selector: "tx-settings",
	moduleId: module.id,
	templateUrl: "./settings.component.html",
	styleUrls: ["./settings.component.css"],
})

export class SettingsComponent implements OnInit {

	public actions: any[];
	public actionItems = [
		{
				icon: "res://BackArrow-Small",
				ios: {position: "right"}
		}
	];

	public constructor(
		private loginService: LoginService,
		private router: RouterExtensions,
		) {
			this.actions = [];
			this.actions.push(
				{
					name: "Sign out",
					description: "sign out and login again"
				}
			);
		}

	public ngOnInit(): void {

	}

	onItemTap(action){
		if (action.name === "Sign out"){
			this.logoff();
		}
	}

	logoff() {
		this.loginService.logoff();
		this.router.navigate(["/login"]);
	}

}
