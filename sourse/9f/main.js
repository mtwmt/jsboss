

var vm = new Vue({
  el: '#app',
  data:{
    winner: '',
    item: [
      {"Flight":"1"},
      {"Child":"4"},
      {"Anything":"5"},
      {"Wifi":"5"},
      {"Wish":"5"}
    ],
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
    run: false,
  },
  watch: {
    deg(){
      if( this.deg === 3599 ){
        this.deg = this.getRandom(0,359);
        this.run = false;
        this.getWinner( this.deg )
      }
    }
  },
  computed: {
    getAngle(){
      // return (360 / this.getItem.length);
      return (360 / this.item.length);
    },
    getItem(){
      // return Object.keys(this.item);
      return this.item
    },
    
  },
  created(){
    
  },
  methods: {
    // 亂數取值
    getRandom(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    getWinner( obj ){
      let _self = this;
      
      // for( let i=0; i< _self.getItem.length; i++ ){
      //   if( obj >= i* _self.getAngle &&  obj < (i+1) * _self.getAngle){
      //     console.log( 'a2',i, _self.getItem[i] )
      //     _self.winner = _self.getItem[i];
      //   }
      // }
    },
    press(){
      let _self = this;

      if(_self.run) return;

      _self.run = true;
      for( let i = 0; i< 3600; i++ ){
        setTimeout(function(){
          _self.deg = i;
        }, i)
      }
      console.log('runsss',this.run)
    }
  },
  template: `
  <div class="main">
    <div class="turntable">
      <div class="item"
        :style="'transform: rotate('+ (getAngle / -2) +'deg)'"
      >
        <div class="items"
          v-for="(key,i) in item.length"
          :key="key"
          :style="'transform: rotate('+ i * getAngle  +'deg)'"
        >
          <div class="fill"
            :style="'transform: rotate('+ (getAngle - 90) +'deg)'"
          ></div>
          <div class="gift"
          :style="
            'transform: rotate('+ getAngle/2 +'deg)'
          "
          ><div class="gift-block">{{ i }}</div>
          </div>
        </div>
      </div>
      <div class="hand"
        :style="'transform: translate(-50%,-69%) rotate('+ deg +'deg)'"
      ></div>
      <div class="press"
        @click="press()"
      >PRESS</div>
    </div>

    <div class="result lt"
      v-if="run !== true"
    >
      <div class="result-text">WELL<br />DONE!</div>
    </div>

    <div class="result rt"
      v-if="run !== true"
    >
      <div class="result-text">
        YOU GET A FREE...
        <i>{{ winner }}</i>
      </div>
    </div>
  </div>
  `
});

// @click=press()
// 物件取長度
// console.log( Object.keys(this.item).length )