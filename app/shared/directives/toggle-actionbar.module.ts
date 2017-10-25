import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ToggleActionbarTitleDirective } from "./toggle-actionbar-title.directive";
import { ToggleActionbarNavDirective } from "./toggle-actionbar-nav.directive";
import { ResetActionbarItemsDirective } from "./reset-actionbar-items.directive";

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [ToggleActionbarTitleDirective, ToggleActionbarNavDirective, ResetActionbarItemsDirective],
    exports: [ToggleActionbarTitleDirective, ToggleActionbarNavDirective, ResetActionbarItemsDirective]
})
export class ToggleActionbarModule { }
