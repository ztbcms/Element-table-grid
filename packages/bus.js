import vue from "vue";
const bus = new vue();
vue.prototype.$Bus = bus
export default bus
