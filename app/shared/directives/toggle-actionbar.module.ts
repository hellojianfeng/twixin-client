import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ToggleActionbarTitleDirective } from "./toggle-actionbar-title.directive";
import { ToggleActionbarNavDirective } from "./toggle-actionbar-nav.directive";

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [ToggleActionbarTitleDirective, ToggleActionbarNavDirective],
    exports: [ToggleActionbarTitleDirective, ToggleActionbarNavDirective]
})
export class ToggleActionbarModule { }
