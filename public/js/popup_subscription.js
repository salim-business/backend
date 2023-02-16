(function (e) {
  "use strict";
  function i() {
    (this.settings = { popup_name: "subscription" }),
      (this.selectors = { popup: ".popup-subscription" }),
      this.load();
  }
  (i.prototype = e.extend({}, i.prototype, {
    load: function () {
      var n = theme.Popups.getByName(this.settings.popup_name);
      if (n.length) {
        var a = function () {
            var t = new Date(),
              s = 24 * 60 * 60 * 1e3 * r;
            t.setTime(t.getTime() + s),
              theme.Cookie.set("subscription", "off", { expires: t });
          },
          o = e(this.selectors.popup),
          c = theme.Cookie.get("subscription"),
          r = +o.attr("data-js-cookies-life") || 1;
        if (window.location.href.indexOf("customer_posted=true") !== -1) a();
        else if (
          !(
            e(".js-subscription-confirmation-error").length &&
            e('[data-js-popup-name="subscription-confirmation"]').length
          )
        ) {
          if (c !== "off") {
            var h = o.find("[data-js-popup-subscription-dont-show]"),
              m = o.attr("data-js-show-once") || !1,
              d = +o.attr("data-js-delay") || 3;
            theme.Popups.addHandler(
              this.settings.popup_name,
              "close.after",
              function () {
                (m === "true" || h.is(":checked")) && a();
              }
            ),
              setTimeout(function () {
                theme.Popups.callByName("subscription");
              }, d * 1e3);
          }
        }
        n.on(
          "click",
          "[data-js-popup-subscription-close-website]",
          function () {
            history.back();
          }
        ),
          e(
            'a[href^="https://shella-demo.myshopify.com?preview_theme_id="]'
          ).on("mousedown", function () {
            var t = e(this),
              s = t.attr("href"),
              u =
                "subscription_preview_theme_id:" +
                s.split("preview_theme_id=")[1];
            if (theme.Cookie.get(u) !== "removed_subscription_cookie") {
              var p = new Date(),
                f = 24 * 60 * 60 * 1e3 * r;
              p.setTime(p.getTime() + f),
                theme.Cookie.set(u, "removed_subscription_cookie", {
                  expires: p,
                }),
                theme.Cookie.deleteCookie("subscription");
            }
          });
      }
    },
  })),
    theme.AssetsLoader.onPageLoaded(function () {
      theme.PopupSubscription = new i();
    });
})(jQueryTheme);
//# sourceMappingURL=/popup-subscription.js.map
