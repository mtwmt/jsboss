import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    edit: false,
    dark: false,
    quote: [
      { text: "路 就是一條直直的", edit: false },
      { text: "雨後的高雄，有下過雨的味道。", edit: false },
      { text: "當我閉上雙眼，眼前只有一片漆黑", edit: false }
    ]
  },
  mutations: {
    updateEdit(state, data) {
      return (state.edit = data);
    },
    updateDark(state, data) {
      return (state.dark = data);
    },
    updateQuote( state, data ){
      return (state.quote = data);
    },
  },
  actions: {
    
  },
});

export default store;