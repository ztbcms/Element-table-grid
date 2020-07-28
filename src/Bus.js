import Vue from "vue";

export const Bus = new Vue();

export default {
  install: Vue => {
    Vue.prototype.$Bus = Bus;
  }
};
