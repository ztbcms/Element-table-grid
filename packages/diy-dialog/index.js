import DiyDialog from './main';

/* istanbul ignore next */
DiyDialog.install = function(Vue) {
  Vue.component(DiyDialog.name, DiyDialog);
};

export default DiyDialog;