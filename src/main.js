// require("babel-polyfill");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VCharts from "v-charts";
import echarts from "echarts";
Vue.config.productionTip = false;
// element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 工具
const moment = require("moment");
//VCharts模块 echarts for vue
Vue.use(VCharts);
Vue.prototype.$echarts = echarts;

Vue.prototype.$moment = moment;
import vOutsideEvents from "vue-outside-events";
Vue.use(vOutsideEvents);
// project css
import "./assets/index.css";
require("./common/css/base.less");



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
