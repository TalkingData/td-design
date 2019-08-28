import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuData: {},
    searchValue: '',
  },
  mutations: {
    SET_MENU_DATA(state, data) {
      state.menuData = data;
    },
    SET_SEARCH_VALUE(state, data) {
      state.searchValue = data;
    }
  },
  actions: {
    setMenuData({
      commit
    }, params) {
      commit("SET_MENU_DATA", params);
    },
    setSearchValue({
      commit
    }, params) {
      commit("SET_SEARCH_VALUE", params);
    }
  }
});