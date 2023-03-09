(function(p){"use strict";function d(){this.settings={offset:15,min_height_diff:100},this.current={scroll:0},this.load()}d.prototype=p.extend({},d.prototype,{load:function(){var i=this,n=p(".js-popup"),e=n.find(".popup-quick-view");this._getSidebars(),theme.Global.responsiveHandler({namespace:".sticky-sidebar",element:$window,on_desktop:!0,is_mobile_prop:"is_mobile_md",is_desktop_prop:"is_desktop_md",onbindload:!0,onunbind_func:function(){p.each(i.sidebars,function(a,f){i._resetSidebar(f)})},events:{"theme.resize.sticky-sidebar scroll.sticky-sidebar sticky-sidebar.update":function(){i.update()}}}),e.length&&theme.Global.responsiveHandler({namespace:".sticky-sidebar",element:p(".js-popup"),on_desktop:!0,is_mobile_prop:"is_mobile_md",is_desktop_prop:"is_desktop_md",onbindload:!0,events:{"scroll.sticky-sidebar":function(){i.update(null,e[0].getBoundingClientRect().top*-1+31)}}})},reload:function(){this._getSidebars(),this.update()},_getSidebars:function(){var i=this;this.sidebars=[],p(".js-sticky-sidebar").each(function(){var n=p(this),e=n.find("[data-js-sticky-sidebar-body]");i.sidebars.push({$elem:n,$parent:n.parent(),$body:e,state:null,disable_offsets:!!e[0].hasAttribute("data-js-disable-offsets")})})},_resetSidebar:function(i){i.$elem.removeClass("sidebar-fixed-bottom sidebar-static-bottom sidebar-fixed-top sidebar-offset-top"),i.$body.removeAttr("style")},_startAction:function(i,n,e){n.state!==i&&(e(),n.state=i)},update:function(i,n){if(theme.current.is_desktop_md){if(i==="listener-enable")this.fixed=!0;else if(i==="listener-disable"){this.fixed=null;return}}else return;n=n||window.scrollY;var e=this,a=document.querySelector("sticky-header"),f=a&&a.getStickyHeight?Math.ceil(a.getStickyHeight()):0,h=theme.ProductFootbar&&theme.ProductFootbar.$footbar?Math.ceil(theme.ProductFootbar.getFootbarHeight()):0;p.each(this.sidebars,function(l,t){var o=t.$parent[0].getBoundingClientRect(),s=t.$body[0].getBoundingClientRect(),r=null;if(s.height+e.settings.min_height_diff>=o.height||t.$elem.hasClass("sticky-sidebar-xl")&&theme.current.bp!=="xl"||t.$elem.hasClass("sticky-sidebar-lg")&&!theme.current.is_desktop){e._startAction(1,t,function(){e._resetSidebar(t)}),t.parent_pos=o,t.body_pos=s;return}if(t.disable_offsets&&(f=0,h=0),i==="listener-enable"){t.$elem.addClass("sidebar-fixed-top"),t.$elem.removeClass("sidebar-offset-top sidebar-fixed-bottom sidebar-static-bottom"),t.$body.css({width:t.$elem.width()+"px",top:s.top+"px",bottom:"","margin-top":""}),t.state=null,t.parent_pos=o,t.body_pos=s;return}else if(i==="listener-process"){s.height>=o.height?e._startAction(1,t,function(){e._resetSidebar(t)}):o.height>t.parent_pos.height&&o.bottom>e.settings.offset+f&&s.top<e.settings.offset+f?(o.bottom<theme.current.height-e.settings.offset-h?r=o.height-s.height:s.top>o.top&&t.parent_pos.bottom<theme.current.height&&(r=o.height-s.height-(o.bottom-theme.current.height)-e.settings.offset-h),r&&r>0&&(t.$elem.removeClass("sidebar-fixed-top sidebar-static-bottom").addClass("sidebar-offset-top"),t.$body.css({width:"",top:"","margin-top":r+"px"}))):o.height<t.parent_pos.height?t.$elem.hasClass("sidebar-fixed-top")&&Math.ceil(o.bottom)<Math.floor(s.bottom)&&(t.$elem.removeClass("sidebar-fixed-top sidebar-offset-top").addClass("sidebar-static-bottom"),t.$body.removeAttr("style")):s.height!==t.body_pos.height&&(o.bottom<theme.current.height-e.settings.offset-h?s.top!==o.top&&t.$body.css({top:(s.height-theme.current.height)*-1-(theme.current.height-o.bottom)+"px"}):s.bottom<theme.current.height?s.height>theme.current.height-e.settings.offset*2-f-h?t.$body.css({top:(s.height-theme.current.height)*-1-e.settings.offset-h+"px"}):o.top<e.settings.offset+f&&t.$body.css({top:e.settings.offset+f+"px"}):s.bottom>o.bottom&&t.$body.css({top:(s.height-theme.current.height)*-1-(theme.current.height-o.bottom)+"px"})),t.body_pos=s,t.parent_pos=o;return}e.fixed||(s.height>theme.current.height-e.settings.offset*2-f-h?n>e.current.scroll?Math.floor(s.bottom)>Math.ceil(theme.current.height-e.settings.offset-h)?e._startAction(2,t,function(){o.top<e.settings.offset+f&&!t.$elem.hasClass("sidebar-offset-top")&&(r=o.top-s.top,t.$elem.addClass("sidebar-offset-top")),t.$elem.removeClass("sidebar-fixed-bottom sidebar-static-bottom sidebar-fixed-top"),t.$body.css({width:"",bottom:"",top:""}),r&&(t.$body.css({"margin-top":r*-1+"px"}),r=null)}):Math.floor(o.bottom)>Math.ceil(theme.current.height-e.settings.offset-h)?e._startAction(3,t,function(){t.$body.css({width:t.$elem.width()+"px",bottom:e.settings.offset+h+"px",top:"","margin-top":""}),t.$elem.removeClass("sidebar-static-bottom sidebar-fixed-top sidebar-offset-top").addClass("sidebar-fixed-bottom")}):e._startAction(4,t,function(){t.$elem.removeClass("sidebar-fixed-bottom sidebar-fixed-top sidebar-offset-top").addClass("sidebar-static-bottom"),t.$body.removeAttr("style")}):n<e.current.scroll&&(s.top<e.settings.offset+f?e._startAction(5,t,function(){o.top<e.settings.offset+f&&!t.$elem.hasClass("sidebar-offset-top")&&(r=o.top-s.top,t.$elem.addClass("sidebar-offset-top")),t.$elem.removeClass("sidebar-fixed-top sidebar-fixed-bottom"),t.$body.css({width:"",top:"",bottom:""}),r&&(t.$body.css({"margin-top":r*-1+"px"}),r=null)}):o.top<e.settings.offset+f?e._startAction(6,t,function(){t.$body.css({width:t.$elem.width()+"px",top:e.settings.offset+f+"px",bottom:"","margin-top":""}),t.$elem.removeClass("sidebar-offset-top sidebar-fixed-bottom sidebar-static-bottom").addClass("sidebar-fixed-top")}):e._startAction(1,t,function(){e._resetSidebar(t)})):o.top<e.settings.offset+f?s.height<o.bottom-e.settings.offset-f?e._startAction(7,t,function(){t.$body.css({width:t.$elem.width()+"px",top:e.settings.offset+f+"px",bottom:"","margin-top":""}),t.$elem.removeClass("sidebar-static-bottom sidebar-fixed-bottom sidebar-offset-top").addClass("sidebar-fixed-top")}):e._startAction(8,t,function(){t.$elem.removeClass("sidebar-fixed-top sidebar-offset-top sidebar-fixed-bottom").addClass("sidebar-static-bottom"),t.$body.removeAttr("style")}):e._startAction(1,t,function(){e._resetSidebar(t)}))}),this.current.scroll=n}}),theme.AssetsLoader.onPageLoaded(function(){theme.StickySidebar=new d})})(jQueryTheme);
//# sourceMappingURL=/s/files/1/0275/1814/0468/t/6/assets/module.sticky-sidebar.js.map?v=139951810672614920761636486497