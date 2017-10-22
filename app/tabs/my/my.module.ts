import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { UserService } from "../../shared/services/user.service";
import { MyComponent } from "./my.component";

// import { routes } from './setting.routing';

@NgModule({
	imports: [
		NativeScriptHttpModule,
		NativeScriptFormsModule,
		NativeScriptModule,
		NativeScriptRouterModule,
		NativeScriptUIListViewModule,
		// ToggleActionbarModule,
    // NativeScriptRouterModule.forChild(routes),
	],
	declarations: [
		MyComponent,
	],
	exports: [
		
	],
	providers: [
		UserService,
	],
})

export class MyModule { }
