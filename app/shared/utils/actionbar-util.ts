import { NavigationButton, ActionItem, ActionItems } from "ui/action-bar";
import { EventData } from "data/observable";
import { Page } from "ui/page";

export function resetActionbarItems(items): void {
  const page = this.page;
  const actionItems = this.page.actionBar.actionItems;
  const router = this.router;
  // first remove all exist actionItems
  actionItems.getItems().forEach(o => {
      actionItems.removeItem(o);
  });
  items.forEach(item => {
      const actionItem = new ActionItem();
      if (item.icon) {
          actionItem.icon = item.icon;
      }
      if (item.ios && item.ios.position) {
          actionItem.ios.position = item.ios.position;
      }
      if (item.nav) {
          actionItem.on("tap", function(args: EventData){
              router.navigate(item.nav);
          });
      }
      actionItems.addItem(actionItem);
  });
}
