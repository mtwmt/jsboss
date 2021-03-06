"use strict";

var vm = new Vue({
  el: '#app',
  data: {
    year: '2017',
    winner: '',
    item: {},
    resultList: {},
    deg: 0,
    run: false,
    stopdeg: '',
    circle: '4'
  },
  watch: {},
  created: function created() {
    this.setYear(this.year);
  },
  computed: {
    getAngle: function getAngle() {
      var _self = this,
          cnt = cnt || 0,
          angle = void 0,
          angleTemp = [],
          angleAccu = [],
          angleItem = [];

      _self.getItem.map(function (e) {
        cnt += _self.item[e][0];
        angleTemp.push(_self.item[e][0]);
      }); // angle = Math.round(360 / cnt);


      angle = 360 / cnt;
      angleTemp.map(function (e, i) {
        e = e * angle; // 陣列累加
        // angleItem[0] = 0;
        // angleItem[1] = angleTemp[0] * angle;
        // angleItem[2] = angleItem[1] + angleTemp[1] * angle;
        // angleItem[3] = angleItem[2] + angleTemp[2] * angle;
        // angleItem[4] = angleItem[3] + angleTemp[3] * angle;
        // angleItem[5] = angleItem[4] + angleTemp[4] * angle;

        angleAccu[i] = angleAccu[i] || 0;
        angleAccu[i + 1] = angleAccu[i] + e;
        angleItem.push(e);
      });
      return {
        angleItem: angleItem,
        angleAccu: angleAccu // return (360 / this.getItem.length);

      };
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
          getAngle = _self.getAngle.angleAccu;

      getAngle.map(function (e, i) {
        if (obj > getAngle[i] && obj <= getAngle[i + 1]) {
          _self.winner = _self.getItem[i];

          if (!_self.item[_self.getItem[i]][0]) {
            _self.press();
          }
        }
      });

      if (parseFloat(_self.item[_self.winner][0], 10) > 0 && _self.winner) {
        _self.resultList[_self.winner] = _self.resultList[_self.winner] || 0;
        _self.resultList[_self.winner] = parseFloat(_self.resultList[_self.winner], 10) + 1;
        _self.item[_self.winner][0] = parseFloat(_self.item[_self.winner][0], 10) - 1;
      }
    },
    runTurn: function runTurn() {
      var _self = this,
          t = void 0,
          circle = parseFloat(_self.circle);

      if (_self.deg >= _self.stopdeg) {
        clearTimeout(t);
        _self.run = false;
        this.getWinner(Math.round(_self.deg) % 360);
      } else {
        _self.deg = parseFloat(_self.deg, 10) || 0;
        t = setTimeout(_self.runTurn, 2);

        if (_self.deg < 180) {
          _self.deg += 10;
        } else if (_self.deg < (circle - 1) * 360) {
          _self.deg += 8;
        } else {
          _self.deg += 2;
        } // if( _self.deg < 720 ){
        //   _self.deg += 10;
        // }else if( _self.deg < 1800 ){
        //   _self.deg += 8;
        // }else if( _self.deg < 2520 ){
        //   _self.deg += 4;
        // }else if( _self.deg < 2880 ){
        //   _self.deg += 2;
        // }else{
        //   _self.deg += 1;
        // }

      }
    },
    press: function press() {
      var _self = this,
          cnt = cnt || 0,
          circle = parseFloat(_self.circle);

      _self.winner = '';
      if (_self.run) return;
      _self.run = true;
      _self.deg = 0; // _self.item = _self.getResult;

      _self.stopdeg = _self.getRandom((circle - 1) * 360 + 1, circle * 360 - 1);

      _self.getItem.map(function (e) {
        if (_self.item[e][0] > 0) {
          cnt += 1;
        }
      });

      if (cnt > 1 && cnt % 2 == 0) {
        _self.item = _self.getResult;
      } else if (cnt === 0) {
        alert('獎項已全部抽光囉!');
        return;
      }

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
  template: "\n  <div class=\"main\">\n    <div class=\"infoset\">\n      <div class=\"btn\">\n        <input type=\"button\" value=\"2017\" @click=\"setYear('2017')\">\n        <input type=\"button\" value=\"2018\" @click=\"setYear('2018')\">\n      </div>\n      <div class=\"getResult\" v-if=\"resultList\">\n        \u5DF2\u62BD\u51FA\u734E\u9805\n        <ul>\n          <li v-for=\"(key,i) in resultList\"\n          >{{ i }}:{{ resultList[i] }}</li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"turntable\">\n      <div class=\"items\"\n      >\n        <div class=\"item\"\n          v-for=\"(key,i) in getItem.length\"\n          :key=\"key\"\n          :style=\"( getAngle.angleItem[i] > 180 ) ?\n          'transform: rotate('+ getAngle.angleAccu[i] +'deg);font-size:'+ Math.min( getAngle.angleItem[i]/2,30) +'px;overflow: visible;':\n          'transform: rotate('+ getAngle.angleAccu[i] +'deg);font-size:'+ Math.min( getAngle.angleItem[i]/2,30) +'px;overflow: hidden;'\"\n          :class=\"( winner == getItem[i] )? 'is-active': ''\"\n        >\n          <div class=\"fill\" \n            :style=\"( getAngle.angleItem[i] > 180 ) ?\n            'transform: rotate('+ (getAngle.angleItem[i] - 90 + 180 - getAngle.angleItem[i] ) +'deg)':\n            'transform: rotate('+ (getAngle.angleItem[i] - 90) +'deg)'\"\n          ></div>\n          <div class=\"fill2\"\n            v-if=\"( getAngle.angleItem[i] > 180)\"\n            :style=\"( getAngle.angleItem[i] > 180 ) ?\n            'transform: rotate('+ (getAngle.angleItem[i] + 90 - 180 ) +'deg)':\n            ''\"\n          ></div>\n          \n          <div class=\"gift\"\n            :style=\"'transform: rotate('+ getAngle.angleItem[i]/2 +'deg)'\"\n          ><div class=\"gift-block\">\n            <i v-if=\"item[getItem[i]][1]\" \n              :class=\"item[getItem[i]][1]\"></i>\n            {{ getItem[i] }}</div>\n          </div>\n        </div>\n        <div class=\"hand\"\n          :style=\"\n            'transform: translate(-50%,-69%) rotate('+ deg +'deg)'\n          \"\n        ></div>\n        <div class=\"press\"\n          @click=\"press()\"\n        >PRESS</div>\n      </div>\n    </div>\n    <div class=\"result lt\"\n      v-if=\"run !== true && winner.length > 0\"\n    >\n      <i v-for=\"i in 5\" :class=\"item[winner][1]\" :style=\"'top:'+ getRandom(0,80) +'%;left:'+ getRandom(0,60) +'%;'\"></i>\n      <div class=\"result-text\">WELL<br />DONE!</div>\n    </div>\n    <div class=\"result rt\"\n      v-if=\"run !== true && winner.length > 0\"\n    > \n    <i v-for=\"i in 5\" :class=\"item[winner][1]\" :style=\"'top:'+ getRandom(0,80) +'%;left:'+ getRandom(40,97) +'%;'\"></i>\n      <div class=\"result-text\">\n        YOU GET A FREE...\n        <p>{{ winner }}!</p>\n      </div>\n    </div>\n  </div>\n  "
}); // 物件取長度
// console.log( Object.keys(this.item).length )