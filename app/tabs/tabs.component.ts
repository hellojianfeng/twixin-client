import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as frameModule from "tns-core-modules/ui/frame";
import { Page } from "ui/page";
import { action } from "ui/dialogs";
import { LoginService, alert } from "../shared";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";

@Component({
    moduleId: module.id,
    selector: "tx-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs-common.css", "./tabs.component.css"],
})

export class TabsComponent implements OnInit {

    private _title: string;

    constructor(private router: Router, private page: Page, private loginService: LoginService) {
        //
    }

    public ngOnInit() {

    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
        }
    }

    public navigateToSettingRoot() {
        this.router.navigate([
        "/home",
        { outlets: {
            settingoutlet: ["setting"],
            contactoutlet: ["contact"],
         } },
        ]);
    }

    public tabViewIndexChange(event) {
        const index = event.newIndex;
        // console.log("index:",index);
        switch (index) {
        case 2:
            this.router.navigate(["/home", { outlets: { contactoutlet: ["contact"]}}]);
            break;
        case 3:
            this.router.navigate(["/home", { outlets: { settingoutlet: ["setting"]}}]);
            break;
        }
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        const tabView = <TabView>args.object;
        const selectedTabViewItem = tabView.items[args.newIndex];

        this.title = selectedTabViewItem.title;

        switch (args.newIndex) {
            case 2:
                this.router.navigate(["/tabs", { outlets: { contactoutlet: ["contacts"]}}]);
                break;
            case 3:
                this.router.navigate(["/tabs", { outlets: { myoutlet: ["mine"]}}]);
                break;
            }
    }

    showMenu() {
        action({
          message: "What would you like to do?",
          actions: ["Share", "Log Off"],
          cancelButtonText: "Cancel"
        }).then((result) => {
          if (result === "Share") {
            // this.share();
          } else if (result === "Log Off") {
            this.logoff();
          }
        });
    }

    logoff() {
        this.loginService.logoff();
        this.router.navigate(["/login"]);
    }
}
