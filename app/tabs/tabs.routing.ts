import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsComponent } from "./tabs.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { ContactsAddFriendComponent } from "./contacts/contacts.addfriend.component";
import { MyComponent } from "./my/my.component";

const tabsRoutes: Routes = [
  { path: "tabs", component: TabsComponent, children: [
    { path: "contacts", component: ContactsComponent, outlet: "contactoutlet", data: { title: "Contact" }},
    { path: "contacts-addfriend", component: ContactsAddFriendComponent, outlet: "contactoutlet", data: { title: "Contact" }},
    { path: "mine", component: MyComponent, outlet: "myoutlet", data: { title: "Mine" }},
  ] },
];
export const tabsRouting: ModuleWithProviders = RouterModule.forChild(tabsRoutes);