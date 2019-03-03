Vue.component('start',{
  props:[],
  methods:{
    gopage(){
      this.$emit('getpage','game'); 
    }
  },
  template: `
  <div class="start">
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
      <button @click="gopage">START</button>
    </div>
  </div>
  `
});

Vue.component('game',{
  props:[],
  data(){
    return {
      step: 0,
      score: [0,0,0,0,0,0,0,0,0],
      cal: [],
      // score: [],
    }
  },
  watch:{
    step(){

      this.score.map( (e,idx)=>{
        if( e !== 0 ){
          this.cal = [
            this.score[1] + this.score[2] + this.score[3],
            this.score[4] + this.score[5] + this.score[6],
            this.score[7] + this.score[8] + this.score[9],
          ]
        }
      })
    },
  },
  computed:{
    // eval(){
    //   return [
    //     this.score[1] + this.score[2] + this.score[3],
    //     this.score[4] + this.score[5] + this.score[6],
    //   ]
    // }
  },
  methods:{
    kick( key ){
      this.step += 1;
      let _self = this,
          $tictactoe = _self.$el.querySelector('.tictactoe'),
          $panel = $tictactoe.querySelectorAll('div');

      $panel.forEach( (el,idx) => {
        if( idx+1 === key && !el.querySelector('i') ){
          if( (this.step % 2) === 1){
            el.innerHTML = '<i class="far fa-circle"></i>';
            this.score[key] = 1;
          }else{
            el.innerHTML = '<i class="fas fa-times"></i>';
            this.score[key] = -1;
          } 
        }
      });
      
    }
  },
  template:`
  <div class="game">
    <div class="tictactoe">
      <div 
        v-for="i in 9" 
        :key="i"
        :data-num="i"
        @click="kick(i)"
      ></div>
      <button>RESTART</button>
    </div>
  </div>
  `
});


var vm = new Vue({
  el: '#app',
  data:{
    page: 'game',
    winner: '',
  },
  methods: {
    getpage( data ){
      this.page = data
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
      @getpage="getpage"
    />
    <winner
      v-else="page === 'winner'"
      @getpage="getpage"
    />
    <end
      v-else="page === 'end'"
      @getpage="getpage"
    />
  </div>
  `
});