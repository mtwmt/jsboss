"use strict";

Vue.component('start', {
  props: ['challenge'],
  methods: {
    go: function go() {
      this.$emit('getpage', 'play');
    }
  },
  template: "\n  <section class=\"start\">\n    <div class=\"header\">\n      <div class=\"sec\">{{ challenge }}</div>\n      <div class=\"caption\">\n        <p>SECONDS</p>\n        <p>CHALLENGE</p>\n      </div>\n    </div>\n    <div class=\"main\">\n      <button\n        @click=\"go()\"\n      >START!</button>\n      <p class=\"tip\">try to answer more as you can</p>\n    </div>\n  </section>\n  "
});
Vue.component('play', {
  props: ['challenge'],
  data: function data() {
    return {
      score: 0,
      result: '',
      status: {
        num1: '',
        num2: '',
        func: '',
        sum: ''
      },
      time: ''
    };
  },
  created: function created() {
    this.time = this.challenge;
    this.countdown();
    this.game();
  },
  methods: {
    getZero: function getZero(str, len) {
      return (Math.pow(10, len) + str + '').substr(1);
    },
    countdown: function countdown() {
      var t = void 0;

      if (--this.time === 0) {
        clearTimeout(t); // 雙向綁定

        this.$emit('getscore', this.score);
        this.$emit('getpage', 'end');
      } else {
        t = setTimeout(this.countdown, 1000);
      }
    },
    // 亂數取值
    randTime: function randTime(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    isNum: function isNum() {
      if (this.time > 40) {
        return this.randTime(0, 9);
      } else if (this.time > 20) {
        return this.randTime(10, 99);
      } else {
        return this.randTime(100, 999);
      }
    },
    isFunc: function isFunc() {
      var func = ['+', '−', '×', '÷'];
      return func[this.randTime(0, func.length - 1)];
    },
    game: function game() {
      this.status.num1 = this.isNum();
      this.status.num2 = this.isNum();
      this.status.func = this.isFunc();

      var _self = this,
          sum = function sum(num1, num2, func) {
        var isResult = void 0;

        if (func === '+') {
          isResult = num1 + num2;
        } else if (func === '−') {
          isResult = num1 - num2;
        } else if (func === '×') {
          isResult = num1 * num2;
        } else if (func === '÷') {
          isResult = num1 / num2;
        }

        if (isResult.toString().indexOf('.') == 1 || isResult == 'Infinity' || isResult < 0) {
          return _self.game();
        }

        console.log('isResult', isResult);
        return _self.status.sum = isResult;
      };

      sum(_self.status.num1, _self.status.num2, _self.status.func);
    },
    answer: function answer() {
      if (this.time > 20 || this.status.num1.toString().length <= 2) {
        if (this.result == this.status.sum) {
          this.score += 1;
        }
      } else {
        if (this.result == this.status.sum) {
          this.score += 5;
        } else {
          this.score -= 1;

          if (this.score <= 0) {
            this.score = 0;
          }
        }
      }

      this.game();
      this.result = '';
    }
  },
  template: "\n  <section class=\"play\">\n    <div class=\"header\">\n      <div class=\"now\">\n        <label>{{ challenge }} SECONDS CHALLENGE</label>\n        <p><span>SCORE</span>{{ getZero(score,3) }}</p>\n      </div>\n      <div class=\"time\">00 : {{ getZero(time,2) }}</div>\n    </div>\n    <div class=\"main\">\n      <div class=\"calculate\">\n        <span class=\"num\">{{ status.num1 }}</span>\n        <span class=\"func\">{{ status.func }}</span>\n        <span class=\"num\">{{ status.num2 }}</span>\n        <span class=\"func\">=</span>\n        <span class=\"sum\" >\n          <input type=\"text\" \n          v-model=\"result\" \n          @keyup.enter=\"answer()\"\n          />\n        </span>\n      </div>\n    </div>\n  </section>\n  "
});
Vue.component('end', {
  props: ['challenge', 'score'],
  data: function data() {
    return {};
  },
  methods: {
    go: function go() {
      this.$emit('getscore', 0);
      this.$emit('getpage', 'start');
    }
  },
  template: "\n  <section class=\"end\">\n    <div class=\"main\">\n      <label>{{ challenge }} SECONDS CHALLENGE</label>\n      <p class=\"final\">YOUR FINAL SCORE</p>\n      <p class=\"result\">{{ score }}</p>\n      <button\n       @click=\"go()\"\n      >TRY AGAIN!</button>\n    </div>\n  </section>\n  "
});
var vm = new Vue({
  el: '#app',
  data: {
    page: "start",
    challenge: 60,
    score: 0
  },
  methods: {
    getscore: function getscore(data) {
      this.score = data;
    },
    gettime: function gettime(data) {
      this.time = data || this.challenge;
    },
    getpage: function getpage(data) {
      this.page = data;
    }
  },
  template: "\n  <div>\n    <start \n      v-if=\"page === 'start'\"\n      :challenge=\"challenge\"\n      @getpage=\"getpage\"\n    />\n    <play \n      v-else-if=\"page === 'play'\"\n      :challenge=\"challenge\"\n      @getscore=\"getscore\"\n      @getpage=\"getpage\"\n    />\n    <end \n      v-else=\"page === 'end'\"\n      :challenge=\"challenge\"\n      :score=\"score\"\n      @getscore=\"getscore\"\n      @getpage=\"getpage\"\n    />\n  </div>\n  "
});