"use strict";

var vm = new Vue({
  el: '#app',
  data: {
    edit: false,
    dark: false
  },
  methods: {
    isActive: function isActive() {
      if (this.edit) {
        this.edit = false;
      } else {
        this.edit = true;
      } // :class=" (!edit ? '':' is-active') + (!dark ? '':' dark')"

    }
  },
  template: "\n  <div class=\"main\"\n    :class=\"{'is-active': edit,'dark':dark}\"\n  >\n    <div class=\"container\">\n      <div class=\"layer\">\n        <div class=\"bg\" style=\"background-image: url('https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80')\"></div>\n        <div class=\"blank\"></div>\n      </div>\n    </div>\n    <div class=\"control\">\n      <i class=\"icon fas fa-bars\" @click=\"isActive\"></i>\n      <div data=\"checkbox-switch\" v-if=\"!edit\">\n        <input type=\"checkbox\" id=\"switch1\" v-model=\"dark\" value=\"true\" />\n        <label for=\"switch1\"></label>\n      </div>\n      <div class=\"quote\">\n        <div class=\"quote-text\">\n          <i>\u201C</i>\n          <div>\u8DDF\u4F60\u8B1B\u96FB\u8A71\u7684\u90A3\u500B\u665A\u4E0A\uFF0C<br />\u6211\u807D\u898B\u4E86\u4F60\u7684\u8072\u97F3\u3002</div>\n        </div>\n        <div class=\"quote-add\">\n          <div class=\"tit\">\u201C\u65B0\u589E\u8A9E\u9304\u201D</div>\n          <input type=\"text\" placeholder=\"\">\n          <button>+</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"sidebar\">\n      <i class=\"icon fas fa-arrow-right\" @click=\"isActive\"></i>\n      <div class=\"sidebar-block\">\n        <div class=\"col\">\n          <div class=\"tit\">\u591C\u9593\u6A21\u5F0F</div>\n          <div data=\"checkbox-switch\">\n          \n            <input type=\"checkbox\" id=\"switch2\" v-model=\"dark\" value=\"true\" />\n            <label for=\"switch2\"></label>\n          </div>\n        </div>  \n      </div>\n      <div class=\"sidebar-block\">  \n        <label>\u6211\u7684\u8A9E\u9304</label>\n        <ul>\n          <li>\n            <span>\u8DEF\uFF0C\u5C31\u662F\u4E00\u689D\u76F4\u76F4\u7684</span>\n            <span class=\"fn\"><i class=\"edit fas fa-pen\"></i><i class=\"del fas fa-trash\"></i></span>\n          </li>\n        </ul>\n        <p><a href=\"\" class=\"more\">\u8F09\u5165\u66F4\u591A</a></p>\n      </div>\n    </div>\n  </div>\n  "
});