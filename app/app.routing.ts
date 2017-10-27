import { AuthGuard } from "./auth-guard.service";
import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ContactsComponent } from "./contacts/contacts.component";
import { InboxComponent } from "./inbox/inbox.component";
import { OutboxComponent } from "./outbox/outbox.component";
import { SettingsComponent } from "./settings/settings.component";
import { ContactsAddFriendComponent } from "./contacts/contacts.addfriend.component";

export const authProviders = [
  AuthGuard
];

export const appRoutes = [
  { path: "", redirectTo: "/inbox", pathMatch: "full", data: {title: "Inbox"}},
  { path: "inbox", component: InboxComponent, data: { title: "Inbox" }},
  { path: "outbox", component: OutboxComponent, data: { title: "Outbox" }},
  { path: "contacts", component: ContactsComponent, data: { title: "Contacts" }},
  { path: "contacts/addfriend", component: ContactsAddFriendComponent },
  { path: "contacts", loadChildren: "./contacts/contacts.module#ContactsModule", data: { title: "Contacts" }},
  // { path: "contacts", redirectTo: "/contacts/list", pathMatch: "full", data: { title: "Contacts" }},
  { path: "settings", component: SettingsComponent, data: { title: "Settings" }},
];
