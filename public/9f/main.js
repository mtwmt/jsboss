"use strict";

var vm = new Vue({
  el: '#app',
  data: {
    winner: {},
    item: {
      "Flight": "1",
      "Child": "4",
      "Anything": "5",
      "Wifi": "5",
      "Wish": "5",
      "1": "5",
      "2": "5",
      "3": "5",
      "4": "5"
    }
  },
  computed: {
    getAngle: function getAngle() {
      // 90是原先要扣掉的角度
      return 360 / this.getItemlen;
    },
    getItemlen: function getItemlen() {
      return Object.keys(this.item).length;
    }
  },
  created: function created() {},
  methods: {},
  template: "\n  <div class=\"main\">\n    <div class=\"turntable\">\n      <div class=\"item\"\n        v-for=\"i in getItemlen\"\n        :key=\"i\"\n        :style=\"'transform: rotate('+ i * getAngle +'deg)'\"\n      >\n        <div class=\"fill\"\n          :style=\"'transform: rotate('+ (getAngle - 90) +'deg)'\"\n        ></div>\n        <div class=\"gift\"\n        :style=\"\n          'top:'+ 100 / getItemlen  +'%;'+\n          'left:'+ (100/getItemlen)*2  +'%;'+\n          'transform: rotate('+ getAngle +'deg)'\n        \"\n        >222</div>\n      </div>\n      <div class=\"hand\"></div>\n      <div class=\"press\">PRESS</div>\n    </div>\n  </div>\n  "
}); // 物件取長度
// console.log( Object.keys(this.item).length )