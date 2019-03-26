import Vue from 'vue';
import App from './App.vue';
import store from '../store';
// new Vue({
//   el: '#app',
//   render: h => h(App),
// });

new Vue({
  // router,
  store,
  render: h => h(App),
}).$mount('#app');