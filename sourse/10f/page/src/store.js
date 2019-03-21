import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    edit: false,
    dark: false,
  },
  mutations: {
    updateEdit(state, data) {
      return (state.edit = data);
    },
    updateDark(state, data) {
      return (state.dark = data);
    },
  },
  actions: {
   
  },
});
export default store;
