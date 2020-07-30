import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Bus from "./Bus";
import "../plugins/element-ui";
import Diy from "./../packages/index"
Vue.use(Diy)
Vue.config.productionTip = false;
// 引入全局广播器
Vue.use(Bus);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
