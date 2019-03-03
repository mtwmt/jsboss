"use strict";

Vue.component('start', {
  props: [],
  methods: {
    gopage: function gopage() {
      this.$emit('getpage', 'game');
    }
  },
  template: "\n  <div class=\"start\">\n    <div class=\"tictactoe\">\n      <div>TIC</div>\n      <div>\u25CB</div>\n      <div>\u2716</div>\n      <div>\u2716</div>\n      <div>TAC</div>\n      <div>\u25CB</div>\n      <div>\u25CB</div>\n      <div>\u2716</div>\n      <div>TOC</div>\n      <button @click=\"gopage\">START</button>\n    </div>\n  </div>\n  "
});
Vue.component('game', {
  props: [],
  data: function data() {
    return {
      step: 0,
      score: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      cal: [] // score: [],

    };
  },
  watch: {
    step: function step() {
      var _this = this;

      this.score.map(function (e, idx) {
        if (e !== 0) {
          _this.cal = [_this.score[1] + _this.score[2] + _this.score[3], _this.score[4] + _this.score[5] + _this.score[6], _this.score[7] + _this.score[8] + _this.score[9]];
        }
      });
    }
  },
  computed: {// eval(){
    //   return [
    //     this.score[1] + this.score[2] + this.score[3],
    //     this.score[4] + this.score[5] + this.score[6],
    //   ]
    // }
  },
  methods: {
    kick: function kick(key) {
      var _this2 = this;

      this.step += 1;

      var _self = this,
          $tictactoe = _self.$el.querySelector('.tictactoe'),
          $panel = $tictactoe.querySelectorAll('div');

      $panel.forEach(function (el, idx) {
        if (idx + 1 === key && !el.querySelector('i')) {
          if (_this2.step % 2 === 1) {
            el.innerHTML = '<i class="far fa-circle"></i>';
            _this2.score[key] = 1;
          } else {
            el.innerHTML = '<i class="fas fa-times"></i>';
            _this2.score[key] = -1;
          }
        }
      });
    }
  },
  template: "\n  <div class=\"game\">\n    <div class=\"tictactoe\">\n      <div \n        v-for=\"i in 9\" \n        :key=\"i\"\n        :data-num=\"i\"\n        @click=\"kick(i)\"\n      ></div>\n      <button>RESTART</button>\n    </div>\n  </div>\n  "
});
var vm = new Vue({
  el: '#app',
  data: {
    page: 'game',
    winner: ''
  },
  methods: {
    getpage: function getpage(data) {
      this.page = data;
    }
  },
  template: "\n  <div class=\"main\">\n    <start \n      v-if=\"page === 'start'\"\n      @getpage=\"getpage\"\n    />\n    <game \n      v-else-if=\"page === 'game'\"\n      @getpage=\"getpage\"\n    />\n    <winner\n      v-else=\"page === 'winner'\"\n      @getpage=\"getpage\"\n    />\n    <end\n      v-else=\"page === 'end'\"\n      @getpage=\"getpage\"\n    />\n  </div>\n  "
});