import Vue from 'vue';
import App from './App.vue';

import mincss from "../node_modules/mini.css/dist/mini-default.css";
import fontwesome from "../node_modules/font-awesome/css/font-awesome.min.css";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
