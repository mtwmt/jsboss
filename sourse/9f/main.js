

var vm = new Vue({
  el: '#app',
  data:{
    winner: {},
    item: {
      "Flight":"1",
      "Child":"4",
      "Anything":"5",
      "Wifi":"5",
      "Wish":"5",
      "1":"5",
      "2":"5",
      "3":"5",
      "4":"5",
    }
  },
  computed: {
    getAngle(){
      // 90是原先要扣掉的角度
      return (360 / this.getItemlen);
    },
    getItemlen(){
      return Object.keys(this.item).length;
    }
  },
  created(){
    
  },
  methods: {
    
  },
  template: `
  <div class="main">
    <div class="turntable">
      <div class="item"
        v-for="i in getItemlen"
        :key="i"
        :style="'transform: rotate('+ i * getAngle +'deg)'"
      >
        <div class="fill"
          :style="'transform: rotate('+ (getAngle - 90) +'deg)'"
        ></div>
        <div class="gift"
        :style="
          'top:'+ 100 / getItemlen  +'%;'+
          'left:'+ (100/getItemlen)*2  +'%;'+
          'transform: rotate('+ getAngle +'deg)'
        "
        >222</div>
      </div>
      <div class="hand"></div>
      <div class="press">PRESS</div>
    </div>
  </div>
  `
});


// 物件取長度
// console.log( Object.keys(this.item).length )