Vue.component('start',{
  props: ['challenge'],
  methods: {
    go(){
      this.$emit('getpage','play'); 
    }
  },
  template: `
  <section class="start">
    <div class="header">
      <div class="sec">{{ challenge }}</div>
      <div class="caption">
        <p>SECONDS</p>
        <p>CHALLENGE</p>
      </div>
    </div>
    <div class="main">
      <button
        @click="go()"
      >START!</button>
      <p class="tip">try to answer more as you can</p>
    </div>
  </section>
  `
});

Vue.component('play',{
  props: ['challenge'],
  data: function(){
    return{
      score: 0,
      result: '',
      status: {
        num1: '',
        num2: '',
        func: '',
        sum: ''
      },
      time: '',
    }
  },
  created() {
    this.time = this.challenge;
    this.countdown();
    this.game();
  },
  methods: {
    getZero(str, len){
      return ( (Math.pow(10,len) + str + '').substr(1) )
    },
    countdown(){
      let t;
      if( --this.time === 0 ){
        clearTimeout(t);
        // 雙向綁定
        this.$emit('getscore', this.score);
        this.$emit('getpage', 'end');
      }else{
        t = setTimeout( this.countdown, 1000 );
      }
    },
    // 亂數取值
    randTime(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    isNum(){
      if( this.time > 40 ){
        return this.randTime( 0,9 );
      }else if( this.time > 20 ){
        return this.randTime( 10,99 );
      }else{
        return this.randTime( 100,999 );
      }
    },
    isFunc(){
      const func = ['+','−','×','÷'];
      return func[this.randTime( 0, func.length - 1 )];
    },
    game(){
      this.status.num1 = this.isNum();
      this.status.num2 = this.isNum();
      this.status.func = this.isFunc();

      let _self = this,
          sum = function( num1, num2, func ){
            let isResult;
            if (func === '+') {
              isResult = num1 + num2;
            } else if (func === '−') {
              isResult = num1 - num2;
            } else if (func === '×') {
              isResult = num1 * num2;
            }else if (func === '÷') {
              isResult = num1 / num2;
            }
            if( isResult.toString().indexOf('.') == 1 || isResult == 'Infinity' || isResult < 0 ){
              return _self.game()
            }
            console.log( 'isResult',isResult )
            return _self.status.sum = isResult;
          };
      sum( _self.status.num1, _self.status.num2, _self.status.func);
    },
    answer(){
      if( this.time > 20 || this.status.num1.toString().length <= 2 ){
        if( this.result == this.status.sum ){
          this.score += 1;
        }
      }else{
        if( this.result == this.status.sum ){
          this.score += 5;
        }else{
          this.score -= 1;  
          if( this.score <= 0 ){
            this.score = 0;  
          }
        }
      }
      this.game();
      this.result = '';
    }
  },
  template: `
  <section class="play">
    <div class="header">
      <div class="now">
        <label>{{ challenge }} SECONDS CHALLENGE</label>
        <p><span>SCORE</span>{{ getZero(score,3) }}</p>
      </div>
      <div class="time">00 : {{ getZero(time,2) }}</div>
    </div>
    <div class="main">
      <div class="calculate">
        <span class="num">{{ status.num1 }}</span>
        <span class="func">{{ status.func }}</span>
        <span class="num">{{ status.num2 }}</span>
        <span class="func">=</span>
        <span class="sum" >
          <input type="text" 
          v-model="result" 
          @keyup.enter="answer()"
          />
        </span>
      </div>
    </div>
  </section>
  `
});

Vue.component('end',{
  props: ['challenge','score'],
  data: function(){
    return{}
  },
  methods: {
    go(){
      this.$emit('getscore', 0)
      this.$emit('getpage', 'start');
    }
  },
  template: `
  <section class="end">
    <div class="main">
      <label>{{ challenge }} SECONDS CHALLENGE</label>
      <p class="final">YOUR FINAL SCORE</p>
      <p class="result">{{ score }}</p>
      <button
       @click="go()"
      >TRY AGAIN!</button>
    </div>
  </section>
  `
});

var vm = new Vue({
  el: '#app',
  data:{
    page: "start",
    challenge: 60,
    score: 0,
  },
  methods: {
    getscore( data ){
      this.score = data;
    },
    gettime (data){
      this.time = data || this.challenge;
    },
    getpage( data ){
      this.page = data;
    }
  },
  template: `
  <div>
    <start 
      v-if="page === 'start'"
      :challenge="challenge"
      @getpage="getpage"
    />
    <play 
      v-else-if="page === 'play'"
      :challenge="challenge"
      @getscore="getscore"
      @getpage="getpage"
    />
    <end 
      v-else="page === 'end'"
      :challenge="challenge"
      :score="score"
      @getscore="getscore"
      @getpage="getpage"
    />
  </div>
  `
});
