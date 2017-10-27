import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ContactsComponent } from "./contacts.component";
import { ContactsAddFriendComponent } from "./contacts.addfriend.component";

export const routes = [
  { path: "", component: ContactsComponent },
  { path: "addfriend", component: ContactsAddFriendComponent },
];