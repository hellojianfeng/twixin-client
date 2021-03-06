import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TNSCheckBoxModule } from "nativescript-checkbox/angular";

// import { ToggleActionbarModule } from '../shared/directives/toggle-actionbar.module';
import { ContactService } from "./contact.service";
// import { SpaceService } from '../shared/services/space.service'
import { UserService } from "../shared/services/user.service";
import { ContactsComponent } from "./contacts.component";
import { ContactsAddFriendComponent } from "./contacts.addfriend.component";
import { ContactsAddGroupComponent } from "./contacts.addgroup.component";

import { TxTabviewModule  } from "../shared/components/tx-tabview.module";

import { routes } from "./contacts.routing";

@NgModule({
	imports: [
		NativeScriptHttpModule,
		NativeScriptUIListViewModule,
		NativeScriptFormsModule,
		NativeScriptModule,
		TxTabviewModule,
		NativeScriptRouterModule,
		TNSCheckBoxModule
    // NativeScriptRouterModule.forChild(routes),
	],
	declarations: [
		ContactsComponent,
		ContactsAddFriendComponent,
		ContactsAddGroupComponent,
	],
	exports: [
		ContactsComponent,
	],
	providers: [
		UserService,
		ContactService,
	],
})

export class ContactsModule { }
