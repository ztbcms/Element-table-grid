import DiyTable from './main';

/* istanbul ignore next */
DiyTable.install = function(Vue) {
  Vue.component(DiyTable.name, DiyTable);
};

export default DiyTable;
