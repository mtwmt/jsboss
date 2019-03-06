
// 開始
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

// 遊戲中
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
    },
  },
  computed:{
    playing(){
      if( this.cal.indexOf(3) >=0 ){
        return this.gopage('winner','〇');
      }else if( this.cal.indexOf(-3) >=0 ){
        return this.gopage('winner','✖');
      }else{
        if( this.step === 9 && this.cal.indexOf(3) >= -1 && this.cal.indexOf(-3) >= -1 ){
          return this.gopage('flat','');
        }
      }
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
    gopage( page, win ){
      this.gowinner( win );
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
        <div class="num">{{totalnum.x}}</div>
        <div class="vs">VS</div>
        <div class="num">{{totalnum.o}}</div>
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

// 贏家
Vue.component('winner',{
  props:['win','totalnum'],
  methods:{
    gopage(){
      this.$emit('getpage','start'); 
    }
  },
  created(){

    if( this.win === '〇' ){
      localStorage.setItem('o', parseInt(this.totalnum.o,10) + 1 )
      this.totalnum.o = parseInt(this.totalnum.o,10) + 1;
    }else if( this.win === '✖' ){
      localStorage.setItem('x', parseInt(this.totalnum.x,10) + 1 )
      this.totalnum.x = parseInt(this.totalnum.x,10) + 1;
    }
  },
  template: `
  <div class="winner">
    <div class="content">
      <div class="score">
        <div class="trun">✖</div>
        <div class="num">{{ totalnum.x }}</div>
        <div class="vs">VS</div>
        <div class="num">{{ totalnum.o }}</div>
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

// 平手
Vue.component('flat',{
  props:['totalnum'],
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
        <div class="num">{{totalnum.x}}</div>
        <div class="vs">VS</div>
        <div class="num">{{totalnum.o}}</div>
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
    page: 'start',
    winner: '',
    score: {
      o:'',
      x:''
    },
  },
  created(){
    this.score.o = localStorage.getItem('o') || 0;
    this.score.x = localStorage.getItem('x') || 0;
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
      :totalnum="score"
      :win="winner"
      @getpage="getpage"
    />
    <flat
      v-else="page === 'flat'"
      :totalnum="score"
      @getpage="getpage"
    />
  </div>
  `
});