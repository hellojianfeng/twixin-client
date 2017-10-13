import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { registerElement } from "nativescript-angular";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ContactsModule } from "./contacts/contacts.module";

import { TabsComponent } from "./tabs.component";

registerElement("Gradient", () => require("nativescript-gradient").Gradient);
registerElement("pullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
import { tabsRouting } from "./tabs.routing";

@NgModule({
	imports: [
		NativeScriptHttpModule,
		NativeScriptFormsModule,
		NativeScriptModule,
		NativeScriptRouterModule,
		tabsRouting,
		ContactsModule

	],
	declarations: [
		TabsComponent,
	],
	exports: [
		TabsComponent,
	],
	providers: [

	],
})
export class TabsModule { }
