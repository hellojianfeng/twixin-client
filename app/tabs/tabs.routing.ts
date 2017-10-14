import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsComponent } from "./tabs.component";
import { ContactsComponent } from "./contacts/contacts.component";

const tabsRoutes: Routes = [
  { path: "tabs", component: TabsComponent, children: [
    { path: "contacts", component: ContactsComponent, outlet: "contactoutlet", data: { title: "Contact" }},
  ] },
];
export const tabsRouting: ModuleWithProviders = RouterModule.forChild(tabsRoutes);