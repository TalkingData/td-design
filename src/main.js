import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./plugins/iview.js";
import "./directives/magnifier";
import "./styles/common.less";

Vue.config.productionTip = false;
// 全局定义bus
var eventBus = {
  install(Vue) {
    Vue.prototype.$bus = new Vue();
  }
};
Vue.use(eventBus);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
