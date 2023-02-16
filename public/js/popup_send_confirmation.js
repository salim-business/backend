(function (o) {
  "use strict";
  function n() {
    (this.settings = {
      popup_subscription_name: "subscription-confirmation",
      popup_contact_name: "contact-confirmation",
    }),
      this.load();
  }
  (n.prototype = o.extend({}, n.prototype, {
    load: function () {
      var i = o(".js-subscription-confirmation-error"),
        a = o('[data-js-popup-name="message"] .note--error'),
        e,
        p = 10;
      function s() {
        var t = new Date(),
          r = 24 * 60 * 60 * 1e3 * p;
        t.setTime(t.getTime() + r),
          theme.Cookie.set("subscription", "off", { expires: t });
      }
      if (
        window.location.href.indexOf("customer_posted=true") !== -1 ||
        window.location.href.indexOf(
          "contact%5Btags%5D=newsletter&form_type=customer"
        ) !== -1
      )
        s(),
          theme.Popups.callByName(this.settings.popup_subscription_name),
          theme.Popups.addHandler(
            this.settings.popup_subscription_name,
            "close.after",
            function () {
              var t = window.location.href
                .replace("?customer_posted=true", "")
                .replace("customer_posted=true", "");
              window.history.replaceState({ path: t }, "", t);
            }
          );
      else if (window.location.href.indexOf("contact_posted=true") !== -1)
        s(),
          theme.Popups.callByName(this.settings.popup_contact_name),
          theme.Popups.addHandler(
            this.settings.popup_contact_name,
            "close.after",
            function () {
              var t = window.location.href
                .replace("?contact_posted=true", "")
                .replace("contact_posted=true", "");
              window.history.replaceState({ path: t }, "", t);
            }
          );
      else if (i.length)
        (e = theme.Popups.getByName(this.settings.popup_subscription_name)),
          e.find("[data-popup-confirmation-success]").addClass("d-none"),
          e
            .find("[data-popup-confirmation-error-message]")
            .html(i.first().html()),
          e.find("[data-popup-confirmation-error]").removeClass("d-none"),
          theme.Popups.callByName(this.settings.popup_subscription_name);
      else if (a.length)
        (e = theme.Popups.getByName(this.settings.popup_contact_name)),
          e.find("[data-popup-confirmation-success]").addClass("d-none"),
          e
            .find("[data-popup-confirmation-error-message]")
            .html(a.first().html()),
          e.find("[data-popup-confirmation-error]").removeClass("d-none"),
          theme.Popups.callByName(this.settings.popup_contact_name);
      else if (
        window.location.href.indexOf("form_type=contact") !== -1 &&
        window.location.href.indexOf("contact_posted=true") === -1 &&
        window.location.href.indexOf("was_reloaded=true") !== -1
      ) {
        window.location.href = window.location.href + "&was_reloaded=true";
        return;
      }
    },
  })),
    theme.AssetsLoader.onPageLoaded(function () {
      theme.PopupSubscriptionСonfirmation = new n();
    });
})(jQueryTheme);
//# sourceMappingURL=/popup-subscription-confirmation.js.map
