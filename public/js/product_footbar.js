(function(n){"use strict";function s(){this.settings={height:0},this.load()}s.prototype=n.extend({},s.prototype,{duration:function(){return theme.animations.footbar_product.duration*1e3},load:function(){var t=this,e=n(".js-footbar-product"),i=n(".js-footer"),o=n("[data-js-footbar-product-limit]");e.length&&o.length&&(this.$footbar=e,$window.on("load theme.resize.productFootbar scroll.productFootbar",function(){t._checkVisible(e,o,i)}))},_checkVisible:function(t,e,i){var o=e[0].getBoundingClientRect(),r=document.querySelector("sticky-header"),c=r&&r.getStickyHeight?r.getStickyHeight():0,d=t.innerHeight();o.top<c&&!t.hasClass("footbar-product--visible")?(t.addClass("footbar-product--visible"),t.stop().slideDown({duration:this.duration(),complete:function(){}}),this.settings.height=t.children().first().innerHeight()):o.top>=c&&t.hasClass("footbar-product--visible")&&(t.removeClass("footbar-product--visible"),t.stop().slideUp({duration:this.duration(),complete:function(){}}),this.settings.height=0),d>0&&(theme.current.is_mobile?(i.css({paddingBottom:""}),i.parent().css({paddingBottom:d})):(i.css({paddingBottom:d}),i.parent().css({paddingBottom:""})))},getFootbarHeight:function(){return this.settings.height},destroy:function(){$window.unbind("theme.resize.productFootbar scroll.productFootbar")}}),theme.AssetsLoader.onPageLoaded(function(){theme.ProductFootbar=new s})})(jQueryTheme);
//# sourceMappingURL=/s/files/1/0275/1814/0468/t/6/assets/module.product-footbar.js.map?v=98662445094094572401636486444