import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    edit: false,
    dark: false,
    pagequote: false,
    addquote: "",
    quote: [{ text: "路 就是一條直直的", edit: false }]
  },
  mutations: {
    // updateEdit(state, data) {
    //   return (state.edit = data);
    // },
    // updateDark(state, data) {
    //   return (state.dark = data);
    // },
    updateQuote( state, data ){
      return (state.quote = data);
    }
  },
  actions: {
    
  },
});

export default store;