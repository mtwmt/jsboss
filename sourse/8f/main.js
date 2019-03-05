Vue.component('start',{
  props:[],
  methods:{
    gopage(){
      this.$emit('getpage','game'); 
    }
  },
  template: `
  <div class="start">
    <div class="content">
      <div class="tictactoe">
        <div>TIC</div>
        <div>○</div>
        <div>✖</div>
        <div>✖</div>
        <div>TAC</div>
        <div>○</div>
        <div>○</div>
        <div>✖</div>
        <div>TOC</div>
      </div>
      <button @click="gopage()">START</button>
    </div>
  </div>
  `
});

Vue.component('game',{
  props:['totalnum','winner'],
  data(){
    return {
      step: 0,
      score: [0,0,0,0,0,0,0,0,0],
      cal: [],
    }
  },
  watch:{
    step(){
      this.score.map( e=>{
        if( e !== 0 ){
          this.cal = [
            this.score[1] + this.score[2] + this.score[3],
            this.score[4] + this.score[5] + this.score[6],
            this.score[7] + this.score[8] + this.score[9],
            this.score[1] + this.score[4] + this.score[7],
            this.score[2] + this.score[5] + this.score[8],
            this.score[3] + this.score[6] + this.score[9],
            this.score[1] + this.score[5] + this.score[9],
            this.score[3] + this.score[5] + this.score[7]
          ]
        }
      });

      this.playing;

      // if( this.step === 9 ){
      //   this.playing;
      // }else{
      //   this.gopage('flat')
      // }
      
    },
  },
  computed:{
    playing(){
      let cnt = 0;
      this.cal.map( e => {
        if( e === 3 || e === -3 ){
          if( e === 3 ){
            this.gowinner('〇');
            this.gopage('winner');
          }else if( e === -3 ){
            this.gowinner('✖');
            this.gopage('winner');
          }
        }
      });

      this.score.map( function( e ){
        cnt += e;
      });

      
    }
  },
  created(){
  },
  methods:{
    kick( key ){
      let _self = this,
          $tictactoe = _self.$el.querySelector('.tictactoe'),
          $panel = $tictactoe.querySelectorAll('div');

      $panel.forEach( (el,idx) => {
        if( idx+1 === key && !el.querySelector('i') ){
          if( (this.step % 2) === 0){
            el.innerHTML = '<i class="far fa-circle"></i>';
            this.score[key] = 1;
            this.step += 1;
          }else{
            el.innerHTML = '<i class="fas fa-times"></i>';
            this.score[key] = -1;
            this.step += 1;
          }
        }
      });
      
    },
    gowinner( win ){
      this.$emit('getwinner', win );
    },
    gopage( page ){
      this.$emit('getpage',page);
    }
  },
  template:`
  <div class="game">
    <div class="content">
      <div class="score">
        <div 
          :class="(step % 2 === 0) ? '': 'is-active'"
          class="trun">✖</div>
        <div class="num">0</div>
        <div class="vs">VS</div>
        <div class="num">0</div>
        <div 
        :class="(step % 2 === 0) ? 'is-active': ''"
          class="trun">○</div>
      </div>
      <div class="tictactoe">
        <div 
          v-for="i in 9" 
          :key="i"
          :data-num="i"
          @click="kick(i)"
        ></div>
      </div>
      <button @click="gopage('start')">RESTART</button>
    </div>
  </div>
  `
});

Vue.component('winner',{
  props:['win'],
  methods:{
    gopage(){
      this.$emit('getpage','start'); 
    }
  },
  template: `
  <div class="winner">
    <div class="content">
      <div class="score">
        <div class="trun">✖</div>
        <div class="num">0</div>
        <div class="vs">VS</div>
        <div class="num">0</div>
        <div class="trun is-active">○</div>
      </div>
      <div class="result">
        <i>{{ win }}</i>
        <div class="text">WINNER!</div>
      </div>
      <button @click="gopage()">RESTART</button>
    </div>
  </div>
  `
});

Vue.component('flat',{
  props:[],
  methods:{
    gopage(){
      this.$emit('getpage','start'); 
    }
  },
  template: `
  <div class="flat">
    <div class="content">
      <div class="score">
        <div class="trun">✖</div>
        <div class="num">0</div>
        <div class="vs">VS</div>
        <div class="num">0</div>
        <div class="trun is-active">○</div>
      </div>
      <div class="result">
        <i>✖〇</i>
        <div class="text">DRAW! DRAW! DRAW!</div>
      </div>
      <button @click="gopage()">RESTART</button>
    </div>
  </div>
  `
});


var vm = new Vue({
  el: '#app',
  data:{
    page: 'game',
    winner: '',
    score: [],
  },
  methods: {
    getpage( data ){
      this.page = data;
    },
    getwinner( data ){
      this.winner = data;
    }
  },
  template: `
  <div class="main">
    <start 
      v-if="page === 'start'"
      @getpage="getpage"
    />
    <game 
      v-else-if="page === 'game'"
      :totalnum="score"
      :winner="winner"
      @getpage="getpage"
      @getwinner="getwinner"
    />
    <winner
      v-else-if="page === 'winner'"
      :win="winner"
      @getpage="getpage"
    />
    <flat
      v-else="page === 'flat'"
      @getpage="getpage"
    />
  </div>
  `
});