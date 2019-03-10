"use strict";

var vm = new Vue({
  el: '#app',
  data: {
    winner: '',
    item: [{
      "Flight": "1"
    }, {
      "Child": "4"
    }, {
      "Anything": "5"
    }, {
      "Wifi": "5"
    }, {
      "Wish": "5"
    }],
    // item: {
    //   "Flight":"1",
    //   "Child":"4",
    //   "Anything":"5",
    //   "Wifi":"5",
    //   "Wish":"5",
    //   "1":"5",
    //   "2":"5",
    // },
    resultList: [],
    deg: '',
    run: false
  },
  watch: {
    deg: function deg() {
      if (this.deg === 3599) {
        this.deg = this.getRandom(0, 359);
        this.run = false;
        this.getWinner(this.deg);
      }
    }
  },
  computed: {
    getAngle: function getAngle() {
      // return (360 / this.getItem.length);
      return 360 / this.item.length;
    },
    getItem: function getItem() {
      // return Object.keys(this.item);
      return this.item;
    }
  },
  created: function created() {},
  methods: {
    // 亂數取值
    getRandom: function getRandom(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    getWinner: function getWinner(obj) {
      var _self = this; // for( let i=0; i< _self.getItem.length; i++ ){
      //   if( obj >= i* _self.getAngle &&  obj < (i+1) * _self.getAngle){
      //     console.log( 'a2',i, _self.getItem[i] )
      //     _self.winner = _self.getItem[i];
      //   }
      // }

    },
    press: function press() {
      var _self = this;

      if (_self.run) return;
      _self.run = true;

      var _loop = function _loop(i) {
        setTimeout(function () {
          _self.deg = i;
        }, i);
      };

      for (var i = 0; i < 3600; i++) {
        _loop(i);
      }

      console.log('runsss', this.run);
    }
  },
  template: "\n  <div class=\"main\">\n    <div class=\"turntable\">\n      <div class=\"item\"\n        :style=\"'transform: rotate('+ (getAngle / -2) +'deg)'\"\n      >\n        <div class=\"items\"\n          v-for=\"(key,i) in item.length\"\n          :key=\"key\"\n          :style=\"'transform: rotate('+ i * getAngle  +'deg)'\"\n        >\n          <div class=\"fill\"\n            :style=\"'transform: rotate('+ (getAngle - 90) +'deg)'\"\n          ></div>\n          <div class=\"gift\"\n          :style=\"\n            'transform: rotate('+ getAngle/2 +'deg)'\n          \"\n          ><div class=\"gift-block\">{{ i }}</div>\n          </div>\n        </div>\n      </div>\n      <div class=\"hand\"\n        :style=\"'transform: translate(-50%,-69%) rotate('+ deg +'deg)'\"\n      ></div>\n      <div class=\"press\"\n        @click=\"press()\"\n      >PRESS</div>\n    </div>\n\n    <div class=\"result lt\"\n      v-if=\"run !== true\"\n    >\n      <div class=\"result-text\">WELL<br />DONE!</div>\n    </div>\n\n    <div class=\"result rt\"\n      v-if=\"run !== true\"\n    >\n      <div class=\"result-text\">\n        YOU GET A FREE...\n        <i>{{ winner }}</i>\n      </div>\n    </div>\n  </div>\n  "
}); // @click=press()
// 物件取長度
// console.log( Object.keys(this.item).length )