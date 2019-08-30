import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuData: {},
  },
  mutations: {
    SET_MENU_DATA(state, data) {
      state.menuData = data;
    },
  },
  actions: {
    setMenuData({
      commit
    }, params) {
      commit("SET_MENU_DATA", params);
    },
  }
});