"use strict";

var vm = new Vue({
  el: '#app',
  data: {
    year: '2017',
    winner: '',
    item: {},
    resultList: {},
    deg: 0,
    run: false
  },
  watch: {
    year: function year() {} // 監控轉到的角度
    // deg(){
    //   if( this.deg === 3599 ){
    //     this.deg = this.getRandom(0,359);
    //     this.run = false;
    //     this.getWinner( this.deg )
    //   }
    // },

  },
  created: function created() {
    this.setYear(this.year);
  },
  computed: {
    getAngle: function getAngle() {
      return 360 / this.getItem.length;
    },
    getItem: function getItem() {
      return Object.keys(this.item);
    },
    getResult: function getResult() {
      var _self = this,
          result = {};

      Object.keys(this.item).map(function (e) {
        if (_self.item[e][0] > 0) {
          return result[e] = _self.item[e];
        }
      });
      return result;
    }
  },
  methods: {
    // 亂數取值
    getRandom: function getRandom(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    // 
    getWinner: function getWinner(obj) {
      var _self = this,
          getAngle = _self.getAngle;

      for (var i = 0; i < _self.getItem.length; i++) {
        if (obj >= i * getAngle && obj < (i + 1) * getAngle) {
          _self.winner = _self.getItem[i];
        }
      }

      _self.resultList[_self.winner] = _self.resultList[_self.winner] || 0;
      _self.resultList[_self.winner] = parseFloat(_self.resultList[_self.winner], 10) + 1;
      _self.item[_self.winner][0] = parseFloat(_self.item[_self.winner][0], 10) - 1;
    },
    runTurn: function runTurn() {
      var _self = this,
          stopdeg = _self.getRandom(720, 2160),
          t = void 0;

      console.log(stopdeg);

      if (_self.deg > stopdeg) {
        clearTimeout(t);
        _self.run = false;
        this.getWinner(_self.deg % 360);
      } else {
        _self.deg = parseFloat(_self.deg, 10) || 0;
        _self.deg += 10;
        t = setTimeout(_self.runTurn, 2);
      }
    },
    press: function press() {
      var _self = this;

      _self.winner = '';
      if (_self.run) return;
      _self.run = true;
      _self.deg = 0;
      _self.item = _self.getResult;

      _self.runTurn();
    },
    setYear: function setYear(data) {
      var _this = this;

      axios.get('data.json').then(function (res) {
        var temp = res.data.find(function (e) {
          return e.year == data;
        });
        _this.resultList = {};
        _this.winner = '';
        _this.deg = 0;
        _this.item = temp.item;
        return _this.year = data;
      });
    }
  },
  template: "\n  <div class=\"main\">\n    <div class=\"infoset\">\n      <div class=\"btn\">\n        <input type=\"button\" value=\"2017\" @click=\"setYear('2017')\">\n        <input type=\"button\" value=\"2018\" @click=\"setYear('2018')\">\n      </div>\n      <div class=\"getResult\" v-if=\"resultList\">\n        \u5DF2\u62BD\u51FA\u734E\u9805\n        <ul>\n          <li v-for=\"(key,i) in resultList\"\n          >{{ i }}:{{ resultList[i] }}</li>\n        </ul>\n      </div>\n      \n    </div>\n    <div class=\"turntable\">\n      <div class=\"item\"\n      >\n        <div class=\"items\"\n          v-for=\"(key,i) in getItem.length\"\n          :key=\"key\"\n          :style=\"'transform: rotate('+ i * getAngle  +'deg);font-size:'+ getAngle/2 +'px;'\"\n          :class=\"( winner == getItem[i] )? 'is-active': ''\"\n        >\n          <div class=\"fill\"\n            :style=\"'transform: rotate('+ (getAngle - 90) +'deg)'\"\n          ></div>\n          <div class=\"gift\"\n            :style=\"'transform: rotate('+ getAngle/2 +'deg)'\"\n          ><div class=\"gift-block\">\n            <i v-if=\"item[getItem[i]][1]\" \n              :class=\"item[getItem[i]][1]\"></i>\n            {{ getItem[i] }}</div>\n          </div>\n        </div>\n        <div class=\"hand\"\n          :style=\"\n            'transform: translate(-50%,-69%) rotate('+ deg +'deg)'\n          \"\n        ></div>\n        <div class=\"press\"\n          @click=\"press()\"\n        >PRESS</div>\n      </div>\n    </div>\n    <div class=\"result lt\"\n      v-if=\"run !== true && winner.length > 0\"\n    >\n      <i v-for=\"i in 5\" :class=\"item[winner][1]\" :style=\"'top:'+ getRandom(0,80) +'%;left:'+ getRandom(0,60) +'%;'\"></i>\n      <div class=\"result-text\">WELL<br />DONE!</div>\n    </div>\n    <div class=\"result rt\"\n      v-if=\"run !== true && winner.length > 0\"\n    > \n    <i v-for=\"i in 5\" :class=\"item[winner][1]\" :style=\"'top:'+ getRandom(0,80) +'%;left:'+ getRandom(40,97) +'%;'\"></i>\n      <div class=\"result-text\">\n        YOU GET A FREE...\n        <p>{{ winner }}!</p>\n      </div>\n    </div>\n  </div>\n  "
}); // :style="'transform: rotate('+ (getAngle / -2) +'deg)'"
// @click=press()
// 物件取長度
// console.log( Object.keys(this.item).length )