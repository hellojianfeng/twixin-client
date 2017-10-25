import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { TxTabviewContainerComponent } from "./tx-tabview-container.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
		NativeScriptHttpModule,
		NativeScriptFormsModule,
		NativeScriptModule,
		NativeScriptRouterModule,
	],
    declarations: [TxTabviewContainerComponent],
    exports: [TxTabviewContainerComponent]
})
export class TxTabviewModule { }
