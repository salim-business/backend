(function (o) {
  "use strict";
  function f() {
    (this.selectors = { elems: ".js-notification" }),
      (this.settings = {
        close_limit: 40,
        translate_limit: 50,
        opacity_limit: 0.4,
      }),
      this.load();
  }
  (f.prototype = o.extend({}, f.prototype, {
    load: function () {
      var e = this,
        t;
      $body.on("mousedown", this.selectors.elems, function (i) {
        if (
          !(
            i.target.tagName === "A" ||
            o(i.target).parents("[data-js-action]").length
          )
        ) {
          e.is_holded = !0;
          var n = o(this),
            s = i.screenX;
          return (
            (t = 0),
            n.addClass("animate"),
            setTimeout(function () {
              n.addClass("pressed");
            }, 0),
            $body.on("mousemove.notification", function (a) {
              var d = a.screenX,
                r = Math.min(
                  s + e.settings.translate_limit,
                  Math.max(s - e.settings.translate_limit, d)
                );
              (t = r - s),
                n.removeClass("animate"),
                setTimeout(function () {
                  n.css({
                    transform: "translateX(" + t + "px) scale(0.95)",
                    opacity: Math.max(
                      (e.settings.translate_limit - Math.abs(t)) /
                        e.settings.translate_limit,
                      e.settings.opacity_limit
                    ),
                  });
                }, 0),
                setTimeout(function () {
                  n.addClass("animate");
                }, 0);
            }),
            $body.one("mouseup.notification", function () {
              n.trigger("mouseup");
            }),
            i.preventDefault(),
            !1
          );
        }
      }),
        $body.on("mouseup", this.selectors.elems, function () {
          var i = o(this);
          (e.is_holded = !1),
            $body.unbind("mousemove.notification mouseup.notification"),
            setTimeout(function () {
              if (Math.abs(t) > e.settings.close_limit) {
                var n = i.find("[data-js-notification-inner]"),
                  s = n.find('[data-js-action="close"]').first();
                if (n.hasClass("d-none")) return;
                i.one("transitionend", function () {
                  (t = 0),
                    i.trigger("mouseup").trigger("transitionend"),
                    s.trigger("click"),
                    n.trigger("transitionend"),
                    i.trigger("onpressedend");
                }),
                  i.css({
                    transform: "translateX(" + (t + 20) + "px) scale(0.95)",
                    opacity: 0,
                  });
              } else
                i.removeClass("pressed"),
                  i.one("transitionend", function () {
                    i.removeClass("animate"), i.trigger("onpressedend");
                  }),
                  i.css({ transform: "", opacity: "" });
              i.css("transition-duration") === "0s" &&
                i.trigger("transitionend");
            }, 0);
        }),
        $body.on("close", this.selectors.elems, function () {
          var i = o(this);
          $body.unbind("mousemove.notification"),
            i.trigger("mouseup").trigger("transitionend");
        }),
        this._products(),
        this._cookies();
    },
    _cookies: function () {
      var e = this,
        t = o(".js-notification-cookies"),
        i,
        n,
        s,
        a,
        d;
      function r() {
        i.one("click", function () {
          if (s === "true") {
            var c = new Date(),
              u = 24 * 60 * 60 * 1e3 * d;
            c.setTime(c.getTime() + u),
              theme.Cookie.set("notification-cookies", "off", { expires: c });
          }
          e._hide(t, function () {
            t.remove();
          }),
            o(this).off();
        });
      }
      if (t.length)
        return (
          (i = t.find('[data-js-action="close"]')),
          (n = theme.Cookie.get("notification-cookies")),
          (s = t.attr("data-js-show-once")),
          (a = +t.attr("data-js-delay")),
          (d = +t.attr("data-js-cookies-life")),
          n !== "off" &&
            (a > 0
              ? setTimeout(function () {
                  e._show(t, function () {
                    r();
                  });
                }, a * 1e3)
              : r()),
          i
        );
    },
    _products: function () {
      var e = this,
        t = o(".js-notification-products");
      if (!t.length) return;
      var i = t.find('[data-js-action="close"]'),
        n = t.find("[data-js-notification-products-item]"),
        s = +t.attr("data-js-delay"),
        a = +t.attr("data-js-interval-min"),
        d = +t.attr("data-js-interval-max"),
        r = +t.attr("data-js-max-time-life"),
        c,
        u,
        g,
        _;
      function p(l, v) {
        return Math.round(l - 0.5 + Math.random() * (v - l + 1));
      }
      function m() {
        e._hide(t, function () {
          h();
        });
      }
      function h() {
        clearInterval(g),
          !t.hasClass("d-none") || e.is_holded
            ? e.is_holded
              ? t.parents(".js-notification").one("onpressedend", function () {
                  m();
                })
              : t.is(":hover")
              ? t.one("mouseleave", function () {
                  m();
                })
              : m()
            : ((c = n.eq(p(0, n.length - 1))),
              (u = p(a, d)),
              n.addClass("d-none"),
              c.removeClass("d-none"),
              e._show(
                t,
                function () {
                  (_ = setTimeout(function () {
                    h();
                  }, u * 1e3)),
                    r !== 0 &&
                      (g = setTimeout(function () {
                        e._hide(t);
                      }, r * 1e3));
                },
                function (l) {
                  l();
                }
              ));
      }
      return (
        setTimeout(function () {
          h();
        }, s * 1e3),
        i.on("click", function () {
          clearTimeout(_), e._hide(t);
        }),
        i
      );
    },
    _show: function (e, t, i) {
      e.unbind("transitionend"),
        t &&
          e.one("transitionend", function () {
            t();
          }),
        e.removeClass("d-none"),
        e.addClass("animate");
      function n() {
        setTimeout(function () {
          e.addClass("visible");
        }, 0),
          e.css("transition-duration") === "0s" && e.trigger("transitionend");
      }
      i ? i(n) : n();
    },
    _hide: function (e, t) {
      e.unbind("transitionend"),
        e.one("transitionend", function () {
          e.addClass("d-none").removeClass("animate").removeAttr("style"),
            e.parents(".js-notification").trigger("close"),
            t && t();
        }),
        e.removeClass("visible"),
        e.css("transition-duration") === "0s" && e.trigger("transitionend");
    },
    destroy: function () {
      o(".js-notification-cookies, .js-notification-products")
        .find('[data-js-action="close"]')
        .off();
    },
  })),
    theme.AssetsLoader.onPageLoaded(function () {
      theme.Notifications = new f();
    });
})(jQueryTheme);
//# sourceMappingURL=/notifications.js.map
