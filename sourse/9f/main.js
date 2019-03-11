
var vm = new Vue({
  el: '#app',
  data:{
    year: '2017',
    winner: '',
    item: {},
    resultList: {},
    deg: 0,
    run: false,
  },
  watch: {
    year(){}
    // 監控轉到的角度
    // deg(){
    //   if( this.deg === 3599 ){
    //     this.deg = this.getRandom(0,359);
    //     this.run = false;
    //     this.getWinner( this.deg )
    //   }
    // },
  },
  created(){
    this.setYear( this.year )
  },
  computed: {
    getAngle(){
      return (360 / this.getItem.length);
    },
    getItem(){
      return Object.keys(this.item);
    },
    getResult(){
      let _self = this,
          result = {};
      Object.keys(this.item).map(e=>{
        if( _self.item[e][0] > 0 ){
          return result[e] = _self.item[e];
        }
      });
      return result;
    },
  },
  
  methods: {
    // 亂數取值
    getRandom(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    // 
    getWinner( obj ){
      console.log( 'win',obj )
      let _self = this,
          getAngle = _self.getAngle;

      for( let i=0; i< _self.getItem.length; i++ ){
        if( obj >= i* getAngle &&  obj < (i+1) * getAngle){
          _self.winner = _self.getItem[i]; 
        }
      }
      _self.resultList[_self.winner] = _self.resultList[_self.winner] || 0;
      _self.resultList[_self.winner] = parseFloat(_self.resultList[_self.winner],10) + 1;
      _self.item[_self.winner][0] = parseFloat(_self.item[_self.winner][0],10) - 1;
    },
    runTurn(){
      let _self = this,
          stopdeg = _self.getRandom(720,2160),
          t;
      if( _self.deg >　stopdeg ){
        clearTimeout(t);
        _self.run = false;
        _self.deg = _self.getRandom(0,359),
        this.getWinner( _self.deg );
      }else{
        _self.deg = parseFloat( _self.deg,10 ) || 0;
        _self.deg += 5;
        t = setTimeout( _self.runTurn ,2);
      }
    },
    press(){
      let _self = this;
      _self.winner = '';
      if(_self.run) return;
      _self.run = true;
      _self.deg = 0;

      _self.item = _self.getResult;

      _self.runTurn();
      
    },
    setYear( data ){
      
      axios.get('data.json')
      .then( res=>{
        let temp = res.data.find( e => (e.year == data) );
        this.resultList = {};
        this.winner = '';
        this.deg = 0;
        this.item = temp.item;
        return this.year = data;
      });
    }
  },
  template: `
  <div class="main">
    <div class="infoset">
      <div class="btn">
        <input type="button" value="2017" @click="setYear('2017')">
        <input type="button" value="2018" @click="setYear('2018')">
      </div>
      <div class="getResult" v-if="resultList">
        已抽出獎項
        <ul>
          <li v-for="(key,i) in resultList"
          >{{ i }}:{{ resultList[i] }}</li>
        </ul>
      </div>
      
    </div>
    <div class="turntable">
      <div class="item"
      >
        <div class="items"
          v-for="(key,i) in getItem.length"
          :key="key"
          :style="'transform: rotate('+ i * getAngle  +'deg);font-size:'+ getAngle/2 +'px;'"
          :class="( winner == getItem[i] )? 'is-active': ''"
        >
          <div class="fill"
            :style="'transform: rotate('+ (getAngle - 90) +'deg)'"
          ></div>
          <div class="gift"
            :style="'transform: rotate('+ getAngle/2 +'deg)'"
          ><div class="gift-block">
            <i v-if="item[getItem[i]][1]" 
              :class="item[getItem[i]][1]"></i>
            {{ getItem[i] }}</div>
          </div>
        </div>
        <div class="hand"
          :style="
            'transform: translate(-50%,-69%) rotate('+ deg +'deg)'
          "
        ></div>
        <div class="press"
          @click="press()"
        >PRESS</div>
      </div>
    </div>
    <div class="result lt"
      v-if="run !== true && winner.length > 0"
    >
      <i v-for="i in 5" :class="item[winner][1]" :style="'top:'+ getRandom(0,80) +'%;left:'+ getRandom(0,60) +'%;'"></i>
      <div class="result-text">WELL<br />DONE!</div>
    </div>
    <div class="result rt"
      v-if="run !== true && winner.length > 0"
    > 
    <i v-for="i in 5" :class="item[winner][1]" :style="'top:'+ getRandom(0,80) +'%;left:'+ getRandom(40,97) +'%;'"></i>
      <div class="result-text">
        YOU GET A FREE...
        <p>{{ winner }}!</p>
      </div>
    </div>
  </div>
  `
});



// 物件取長度
// console.log( Object.keys(this.item).length )
