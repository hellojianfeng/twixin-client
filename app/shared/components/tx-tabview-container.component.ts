import { Component, OnInit , EventEmitter, Input, Output, ElementRef, AfterViewInit, ViewChild } from "@angular/core";
import { ChangedData, ChangeType, ObservableArray } from "data/observable-array";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";
import { Router } from "@angular/router";

@Component({
  selector: "tx-tabview-container",
	moduleId: module.id,
	templateUrl: "./tx-tabview-container.component.html",
	styleUrls: ["./tx-tabview-container.component.css"],
})

export class TxTabviewContainerComponent implements OnInit, AfterViewInit {
  @Input()  selectedTab: string;
  @ViewChild("tabView") el: ElementRef;
  public showInbox;
  public showOubbox;
  public showContacts;
  public showSettings;

  public constructor(private router: Router){}

	public ngOnInit(): void {
    if (this.selectedTab === "inbox"){
      this.showInbox = true;
      this.el.nativeElement.selectedIndex = 0;
    }
    if (this.selectedTab === "outbox"){
      this.showOubbox = true;
      this.el.nativeElement.selectedIndex = 1;
    }
    if (this.selectedTab === "contacts"){
      this.showContacts = true;
      this.el.nativeElement.selectedIndex = 2;
    }
    if (this.selectedTab === "settings"){
      this.showSettings = true;
      this.el.nativeElement.selectedIndex = 3;
    }
  }

  public ngAfterViewInit(): void {

  }

  onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    const tabView = <TabView>args.object;
    const selectedTabViewItem = tabView.items[args.newIndex];

    if (selectedTabViewItem.title === "Inbox"){
      this.router.navigate(["/inbox"]);
    }

    if (selectedTabViewItem.title === "Outbox"){
      this.router.navigate(["/outbox"]);
    }

    if (selectedTabViewItem.title === "Contacts"){
      this.router.navigate(["/contacts"]);
    }

    if (selectedTabViewItem.title === "Settings"){
      this.router.navigate(["/settings"]);
    }
}

}
