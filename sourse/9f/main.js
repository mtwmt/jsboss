
var vm = new Vue({
  el: '#app',
  data:{
    year: '2017',
    winner: '',
    item: {},
    resultList: {},
    deg: 0,
    run: false,
    stopdeg:'',
  },
  watch: {
  },
  created(){
    this.setYear( this.year )
  },
  computed: {
    getAngle(){
      let _self = this,
          cnt = cnt || 0,
          angle,
          angleTemp = [],
          angleAccu = [],
          angleItem = [];

      _self.getItem.map(e=>{
        cnt += _self.item[e][0];
        angleTemp.push( _self.item[e][0]);
      });
      angle = Math.round(360 / cnt);

      angleTemp.map((e,i)=>{
        e = e * angle;

        // 陣列累加
        // angleItem[0] = 0;
        // angleItem[1] = angleTemp[0] * angle;
        // angleItem[2] = angleItem[1] + angleTemp[1] * angle;
        // angleItem[3] = angleItem[2] + angleTemp[2] * angle;
        // angleItem[4] = angleItem[3] + angleTemp[3] * angle;
        // angleItem[5] = angleItem[4] + angleTemp[4] * angle;

        angleAccu[i] = angleAccu[i] || 0;
        angleAccu[i+1] = angleAccu[i] + e;
        angleItem.push( e )
      });
      return {
        angleItem: angleItem,
        angleAccu: angleAccu
      }
      // return (360 / this.getItem.length);
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
      let _self = this,
          getAngle = _self.getAngle.angleAccu;

      getAngle.map( (e,i) =>{
        if( obj > getAngle[i] && obj <= getAngle[i+1] ){
          _self.winner = _self.getItem[i]; 
          if( _self.item[_self.getItem[i]][0] == 0 ){
            _self.press();
          }
        }
      });

      if( parseFloat(_self.item[_self.winner][0],10) > 0 ){
        _self.resultList[_self.winner] = _self.resultList[_self.winner] || 0;
        _self.resultList[_self.winner] = parseFloat(_self.resultList[_self.winner],10) + 1;
        _self.item[_self.winner][0] = parseFloat(_self.item[_self.winner][0],10) - 1
      }
    },
    runTurn(){
      let _self = this,    
          t;
      if( _self.deg >= _self.stopdeg ){
        clearTimeout(t);
        _self.run = false;
        this.getWinner( Math.round(_self.deg) % 360);
      }else{
        _self.deg = parseFloat( _self.deg,10 ) || 0;
        t = setTimeout( _self.runTurn ,2);

        if( _self.deg < 720 ){
          _self.deg += 10;
        }else if( _self.deg < 1800 ){
          _self.deg += 8;
        }else if( _self.deg < 2520 ){
          _self.deg += 4;
        }else if( _self.deg < 2880 ){
          _self.deg += 2;
        }else{
          _self.deg += 1;
        }
      }
    },
    press(){
      let _self = this,
          cnt = cnt || 0;
      _self.winner = '';
      if(_self.run) return;
      _self.run = true;
      _self.deg = 0;
      // _self.item = _self.getResult;
      _self.stopdeg = _self.getRandom(3241,3599);

      _self.getItem.map( function( e ){
        if( _self.item[e][0] > 0 ){
          cnt += 1;
        }
      });

      if( cnt > 1 && cnt % 2 == 0){
        _self.item = _self.getResult;
      }else if( cnt === 0 ){
        alert('獎項已全部抽光囉!');
        return;
      }      
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
        <input type="button" value="test" @click="setYear('test')">
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
          :style="( getAngle.angleItem[i] > 180 ) ?
          'transform: rotate('+ getAngle.angleAccu[i] +'deg);font-size:'+ Math.min( getAngle.angleItem[i]/2,30) +'px;overflow: visible;':
          'transform: rotate('+ getAngle.angleAccu[i] +'deg);font-size:'+ Math.min( getAngle.angleItem[i]/2,30) +'px;overflow: hidden;'"
          :class="( winner == getItem[i] )? 'is-active': ''"
        >
          <div class="fill" :style="'transform: rotate('+ (getAngle.angleItem[i] - 90) +'deg)'"
          ></div>
          <div class="fill2"
            v-if="( getAngle.angleItem[i] > 180)"
            :style="( getAngle.angleItem[i] > 180 && i%2 == 0 ) ?
            'transform: rotate('+ (getAngle.angleItem[i] - 180 - 90 + 2) +'deg)':
            ''"
          ></div>
          
          <div class="gift"
            :style="'transform: rotate('+ getAngle.angleItem[i]/2 +'deg)'"
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
