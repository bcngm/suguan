import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });

import Vant from 'vant';
import 'vant/lib/index.css';

import axios from 'axios'
Vue.prototype.axios = axios

import SvgIcon from 'vue-svgicon'
Vue.use(SvgIcon, { tagName: 'svg-icon' });

Vue.use(Vant);

import ViewUI from 'view-design';

// import style
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
