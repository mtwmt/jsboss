"use strict";

Vue.component('start', {
  props: [],
  methods: {
    gopage: function gopage() {
      this.$emit('getpage', 'game');
    }
  },
  template: "\n  <div class=\"start\">\n    <div class=\"content\">\n      <div class=\"tictactoe\">\n        <div>TIC</div>\n        <div>\u25CB</div>\n        <div>\u2716</div>\n        <div>\u2716</div>\n        <div>TAC</div>\n        <div>\u25CB</div>\n        <div>\u25CB</div>\n        <div>\u2716</div>\n        <div>TOC</div>\n      </div>\n      <button @click=\"gopage()\">START</button>\n    </div>\n  </div>\n  "
});
Vue.component('game', {
  props: ['totalnum', 'winner'],
  data: function data() {
    return {
      step: 0,
      score: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      cal: []
    };
  },
  watch: {
    step: function step() {
      var _this = this;

      this.score.map(function (e) {
        if (e !== 0) {
          _this.cal = [_this.score[1] + _this.score[2] + _this.score[3], _this.score[4] + _this.score[5] + _this.score[6], _this.score[7] + _this.score[8] + _this.score[9], _this.score[1] + _this.score[4] + _this.score[7], _this.score[2] + _this.score[5] + _this.score[8], _this.score[3] + _this.score[6] + _this.score[9], _this.score[1] + _this.score[5] + _this.score[9], _this.score[3] + _this.score[5] + _this.score[7]];
        }
      });
      this.playing; // if( this.step === 9 ){
      //   this.playing;
      // }else{
      //   this.gopage('flat')
      // }
    }
  },
  computed: {
    playing: function playing() {
      var _this2 = this;

      var cnt = 0;
      this.cal.map(function (e) {
        if (e === 3 || e === -3) {
          if (e === 3) {
            _this2.gowinner('〇');

            _this2.gopage('winner');
          } else if (e === -3) {
            _this2.gowinner('✖');

            _this2.gopage('winner');
          }
        }
      });
      this.score.map(function (e) {
        cnt += e;
      });
    }
  },
  created: function created() {},
  methods: {
    kick: function kick(key) {
      var _this3 = this;

      var _self = this,
          $tictactoe = _self.$el.querySelector('.tictactoe'),
          $panel = $tictactoe.querySelectorAll('div');

      $panel.forEach(function (el, idx) {
        if (idx + 1 === key && !el.querySelector('i')) {
          if (_this3.step % 2 === 0) {
            el.innerHTML = '<i class="far fa-circle"></i>';
            _this3.score[key] = 1;
            _this3.step += 1;
          } else {
            el.innerHTML = '<i class="fas fa-times"></i>';
            _this3.score[key] = -1;
            _this3.step += 1;
          }
        }
      });
    },
    gowinner: function gowinner(win) {
      this.$emit('getwinner', win);
    },
    gopage: function gopage(page) {
      this.$emit('getpage', page);
    }
  },
  template: "\n  <div class=\"game\">\n    <div class=\"content\">\n      <div class=\"score\">\n        <div \n          :class=\"(step % 2 === 0) ? '': 'is-active'\"\n          class=\"trun\">\u2716</div>\n        <div class=\"num\">0</div>\n        <div class=\"vs\">VS</div>\n        <div class=\"num\">0</div>\n        <div \n        :class=\"(step % 2 === 0) ? 'is-active': ''\"\n          class=\"trun\">\u25CB</div>\n      </div>\n      <div class=\"tictactoe\">\n        <div \n          v-for=\"i in 9\" \n          :key=\"i\"\n          :data-num=\"i\"\n          @click=\"kick(i)\"\n        ></div>\n      </div>\n      <button @click=\"gopage('start')\">RESTART</button>\n    </div>\n  </div>\n  "
});
Vue.component('winner', {
  props: ['win'],
  methods: {
    gopage: function gopage() {
      this.$emit('getpage', 'start');
    }
  },
  template: "\n  <div class=\"winner\">\n    <div class=\"content\">\n      <div class=\"score\">\n        <div class=\"trun\">\u2716</div>\n        <div class=\"num\">0</div>\n        <div class=\"vs\">VS</div>\n        <div class=\"num\">0</div>\n        <div class=\"trun is-active\">\u25CB</div>\n      </div>\n      <div class=\"result\">\n        <i>{{ win }}</i>\n        <div class=\"text\">WINNER!</div>\n      </div>\n      <button @click=\"gopage()\">RESTART</button>\n    </div>\n  </div>\n  "
});
Vue.component('flat', {
  props: [],
  methods: {
    gopage: function gopage() {
      this.$emit('getpage', 'start');
    }
  },
  template: "\n  <div class=\"flat\">\n    <div class=\"content\">\n      <div class=\"score\">\n        <div class=\"trun\">\u2716</div>\n        <div class=\"num\">0</div>\n        <div class=\"vs\">VS</div>\n        <div class=\"num\">0</div>\n        <div class=\"trun is-active\">\u25CB</div>\n      </div>\n      <div class=\"result\">\n        <i>\u2716\u3007</i>\n        <div class=\"text\">DRAW! DRAW! DRAW!</div>\n      </div>\n      <button @click=\"gopage()\">RESTART</button>\n    </div>\n  </div>\n  "
});
var vm = new Vue({
  el: '#app',
  data: {
    page: 'game',
    winner: '',
    score: []
  },
  methods: {
    getpage: function getpage(data) {
      this.page = data;
    },
    getwinner: function getwinner(data) {
      this.winner = data;
    }
  },
  template: "\n  <div class=\"main\">\n    <start \n      v-if=\"page === 'start'\"\n      @getpage=\"getpage\"\n    />\n    <game \n      v-else-if=\"page === 'game'\"\n      :totalnum=\"score\"\n      :winner=\"winner\"\n      @getpage=\"getpage\"\n      @getwinner=\"getwinner\"\n    />\n    <winner\n      v-else-if=\"page === 'winner'\"\n      :win=\"winner\"\n      @getpage=\"getpage\"\n    />\n    <flat\n      v-else=\"page === 'flat'\"\n      @getpage=\"getpage\"\n    />\n  </div>\n  "
});