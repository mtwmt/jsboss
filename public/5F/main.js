"use strict";

Vue.component('city', {
  props: ['tit', 'data'],
  data: function data() {
    return {
      site: ''
    };
  },
  watch: {
    tit: function tit() {
      this.site = '';
    }
  },
  computed: {
    isSite: function isSite() {
      return !this.site ? this.data[0] : this.site;
    }
  },
  methods: {
    getSite: function getSite(site) {
      return this.site = site;
    },
    getClass: function getClass(cls) {
      if (cls.AQI <= 50) {
        return 'aqi1';
      } else if (cls.AQI > 50 && cls.AQI <= 100) {
        return 'aqi2';
      } else if (cls.AQI > 100 && cls.AQI <= 150) {
        return 'aqi3';
      } else if (cls.AQI > 150 && cls.AQI <= 200) {
        return 'aqi4';
      } else if (cls.AQI > 200 && cls.AQI <= 300) {
        return 'aqi5';
      } else if (cls.AQI > 300 && cls.AQI <= 400) {
        return 'aqi6';
      }
    }
  },
  template: "\n  <div class=\"theme-body\">\n    <h2>\n      <div class=\"city\">{{ tit }}</div>\n      <hr />\n      <div class=\"update\">{{ isSite.PublishTime }} \u66F4\u65B0</div>\n    </h2>\n    <div class=\"md-site\">\n      <div class=\"show\">\n        <div class=\"site\">\n          <span class=\"name\">{{ isSite.SiteName }}</span>\n          <span \n            class=\"aqi\" \n            :class=\"getClass( isSite )\"\n            >{{ isSite.AQI }}</span>\n        </div>\n        <ul>\n          <li>\n            <span class=\"\">\u81ED\u6C27</span>\n            <span class=\"en\">O3 (ppb)</span>\n            <span>{{ isSite.O3 }}</span>\n          </li>\n          <li>\n            <span class=\"\">\u61F8\u6D6E\u5FAE\u7C92</span>\n            <span class=\"en\">PM10 (\u03BCg/m\xB3)</span>\n            <span>{{ isSite.PM10 }}</span>\n          </li>\n          <li>\n            <span class=\"\">\u7D30\u61F8\u6D6E\u5FAE\u7C92</span>\n            <span class=\"en\">PM2.5 (\u03BCg/m\xB3)</span>\n            <span>{{ isSite['PM2.5'] }}</span>\n          </li>\n          <li>\n            <span class=\"\">\u4E00\u6C27\u5316\u78B3</span>\n            <span class=\"en\">CO (ppm)</span>\n            <span>{{ isSite.CO }}</span>\n          </li>\n          <li>\n            <span class=\"\">\u4E8C\u6C27\u5316\u786B</span>\n            <span class=\"en\">SO2 (ppb)</span>\n            <span>{{ isSite.SO2 }}</span>\n          </li>\n          <li>\n            <span class=\"\">\u4E8C\u6C27\u5316\u6C2E</span>\n            <span class=\"en\">NO2 (ppb)</span>\n            <span>{{ isSite.NO2 }}</span>\n          </li>\n        </ul>\n      </div>\n      <div class=\"item\">\n        <ul>\n          <li class=\"site\"\n            v-for=\"(i,k) in data\"\n            :key=\"k\"\n            @click=\"getSite(i)\"\n          >\n            <span class=\"name\">{{ i.SiteName }}</span>\n            <span class=\"aqi\" :class=\"getClass(i)\" >{{ i.AQI }}</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  "
});
var vm = new Vue({
  el: '#app',
  data: {
    data: [],
    key: '高雄市',
    info: [{
      range: "0～50",
      feeing: "良好",
      cls: "aqi1",
      color: "#95F084"
    }, {
      range: "51～100",
      feeing: "普通",
      cls: "aqi2",
      color: "#FFE695"
    }, {
      range: "101～150",
      feeing: "對敏感族群<br />不健康",
      cls: "aqi3",
      color: "#FFAF6A"
    }, {
      range: "151～200",
      feeing: "對所有族群<br />不健康",
      cls: "aqi4",
      color: "#FF5757"
    }, {
      range: "210～300",
      feeing: "非常不健康",
      cls: "aqi5",
      color: "#9777FF"
    }, {
      range: "301～400",
      feeing: "危害",
      cls: "aqi6",
      color: "#AD1774"
    }]
  },
  created: function created() {
    var _this = this;

    axios.get('https://script.google.com/macros/s/AKfycbzOdvWalYBBLDWpX1h_mE0mL-HMV9wygY6jI-ITovsVPIb6LSqb/exec?url=opendata.epa.gov.tw/ws/Data/AQI/?$format=json').then(function (res) {
      console.log(res);
      _this.data = res.data;
    });
  },
  computed: {
    datacity: function datacity() {
      var _self = this;

      var temp = void 0;
      temp = this.data.map(function (e) {
        return e.County;
      });
      temp = temp.filter(function (el, idx, arr) {
        return arr.indexOf(el) === idx;
      });
      return temp;
    },
    datalist: function datalist() {
      var _this2 = this;

      var temp = this.data.filter(function (el) {
        return el.County === _this2.key;
      });
      return temp;
    }
  },
  methods: {}
});