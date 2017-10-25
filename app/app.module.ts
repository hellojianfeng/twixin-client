import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { authProviders, appRoutes } from "./app.routing";
import { AppComponent } from "./app.component";
import { setStatusBarColors, BackendService, LoginService } from "./shared";

import { LoginModule } from "./login/login.module";
import { InboxModule } from "./inbox/inbox.module";
import { OutboxModule } from "./outbox/outbox.module";
import { ContactsModule } from "./contacts/contacts.module";
import { SettingsModule } from "./settings/settings.module";
// import { ToggleActionbarModule } from "./shared/directives/toggle-actionbar.module";

setStatusBarColors();

@NgModule({
  providers: [
    BackendService,
    LoginService,
    authProviders
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    LoginModule,
    InboxModule,
    OutboxModule,
    ContactsModule,
    SettingsModule
    // ToggleActionbarModule,
  ],
  declarations: [
      AppComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
