import I18n from "I18n";
import { createWidget } from "discourse/widgets/widget";
import { iconNode } from "discourse-common/lib/icon-library";
import { h } from "virtual-dom";
import DiscourseURL from "discourse/lib/url";

export default {
  name: "raw-post-button",
  initialize() {
    withPluginApi("0.8.7", api => {
      const currentUser = api.getCurrentUser();
      if (!currentUser) return;

      if (
        currentUser.staff ||
        currentUser.trust_level >= settings.min_trust_level
      ) {
        api.attachWidgetAction("post-menu", "showRaw", function() {
          const model = this.attrs;
          showModal("rawPost", {
            model,
            title: themePrefix("modal_title")
          });
        });

        api.addPostMenuButton("show-raw", () => {
          return {
            action: "showRaw",
            icon: "file-alt",
            className: "raw-post",
            title: themePrefix("button_title"),
            position: "second-last-hidden"
          };
        });
      }
    });
  }
};
