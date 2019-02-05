Vue.component('city',{
  props : ['tit','data'],
  data : function(){
    return {
      site: ''
    }
  },
  watch: {
    tit(){
      this.site = '';
    }
  },
  computed:{
    isSite(){
      return (!this.site) ? this.data[0]: this.site;
    }
  },
  methods:{
    getSite( site ){
      return this.site = site;
    },
    getClass( cls ){
      if( cls.AQI <= 50){
        return 'aqi1';
      }else if( cls.AQI > 50 && cls.AQI <= 100 ){
        return 'aqi2';
      }else if( cls.AQI > 100 && cls.AQI <= 150 ){
        return 'aqi3';
      }else if( cls.AQI > 150 && cls.AQI <= 200 ){
        return 'aqi4';
      }else if( cls.AQI > 200 && cls.AQI <= 300 ){
        return 'aqi5';
      }else if( cls.AQI > 300 && cls.AQI <= 400 ){
        return 'aqi6';
      }
    }
  },
  template : `
  <div class="theme-body">
    <h2>
      <div class="city">{{ tit }}</div>
      <hr />
      <div class="update">{{ isSite.PublishTime }} 更新</div>
    </h2>
    <div class="md-site">
      <div class="show">
        <div class="site">
          <span class="name">{{ isSite.SiteName }}</span>
          <span 
            class="aqi" 
            :class="getClass( isSite )"
            >{{ isSite.AQI }}</span>
        </div>
        <ul>
          <li>
            <span class="">臭氧</span>
            <span class="en">O3 (ppb)</span>
            <span>{{ isSite.O3 }}</span>
          </li>
          <li>
            <span class="">懸浮微粒</span>
            <span class="en">PM10 (μg/m³)</span>
            <span>{{ isSite.PM10 }}</span>
          </li>
          <li>
            <span class="">細懸浮微粒</span>
            <span class="en">PM2.5 (μg/m³)</span>
            <span>{{ isSite['PM2.5'] }}</span>
          </li>
          <li>
            <span class="">一氧化碳</span>
            <span class="en">CO (ppm)</span>
            <span>{{ isSite.CO }}</span>
          </li>
          <li>
            <span class="">二氧化硫</span>
            <span class="en">SO2 (ppb)</span>
            <span>{{ isSite.SO2 }}</span>
          </li>
          <li>
            <span class="">二氧化氮</span>
            <span class="en">NO2 (ppb)</span>
            <span>{{ isSite.NO2 }}</span>
          </li>
        </ul>
      </div>
      <div class="item">
        <ul>
          <li class="site"
            v-for="(i,k) in data"
            :key="k"
            @click="getSite(i)"
          >
            <span class="name">{{ i.SiteName }}</span>
            <span class="aqi" :class="getClass(i)" >{{ i.AQI }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  `,
});



var vm = new Vue({
  el: '#app',
  data:{
    data: [],
    key: '高雄市',
    info: [
      {
        range: "0～50",
        feeing: "良好",
        cls: "aqi1",
        color: "#95F084"
      },
      {
        range: "51～100",
        feeing: "普通",
        cls: "aqi2",
        color: "#FFE695"
      },
      {
        range: "101～150",
        feeing: "對敏感族群<br />不健康",
        cls: "aqi3",
        color: "#FFAF6A"
      },
      {
        range: "151～200",
        feeing: "對所有族群<br />不健康",
        cls: "aqi4",
        color: "#FF5757"
      },
      {
        range: "210～300",
        feeing: "非常不健康",
        cls: "aqi5",
        color: "#9777FF"
      },
      {
        range: "301～400",
        feeing: "危害",
        cls: "aqi6",
        color: "#AD1774"
      }
    ]
  },
  created() {
    axios.get('https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=opendata.epa.gov.tw/ws/Data/AQI/?$format=json')
    .then( res=>{
      console.log( res )
      this.data = res.data;
    })
  },
  computed: {
    datacity (){
      const _self = this;
      let temp;  
      temp = this.data.map( e=> e.County );
      temp = temp.filter((el, idx, arr) => arr.indexOf(el) === idx);

      return temp;
    },
    datalist (){
      let temp = this.data.filter(el => el.County === this.key )
      return temp
    }
  },
  methods: {
  }  
});