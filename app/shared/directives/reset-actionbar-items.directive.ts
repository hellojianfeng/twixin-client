import { ActivatedRoute } from "@angular/router";
import { Directive, OnInit, ElementRef, HostListener, Input } from "@angular/core";
import { EventData } from "data/observable";
import { NavigationButton, ActionItem, ActionItems } from "ui/action-bar";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "application";

@Directive({
    selector: "[txResetActionbarItems]"
})
export class ResetActionbarItemsDirective implements OnInit {
    constructor(route: ActivatedRoute, private page: Page, private routerExtensions: RouterExtensions) {
        this.resetActionItems(this.actionItems);
    }

    @Input("actionItems") actionItems: string;

    ngOnInit() {
        this.resetActionItems(this.actionItems);
    }

    resetActionItems(items): void {
        const page = this.page;
        const actionItems = this.page.actionBar.actionItems;
        // first remove all exist actionItems
        actionItems.getItems().forEach(o => {
            actionItems.removeItem(o);
        });
        items.forEach(item => {
            const actionItem = new ActionItem();
            if (item.icon) {
                actionItem.icon = item.icon;
            }
            if (item.ios && item.ios.position) {
                actionItem.ios.position = item.ios.position;
            }
            actionItems.addItem(actionItem);
        });
    }
}
