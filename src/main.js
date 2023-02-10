import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/modify-element.scss';
Vue.use(ElementUI);
 /**
 * 挂载百度地图
 */
  import BaiduMap from 'vue-baidu-map'
  import { BmlMarkerClusterer } from 'vue-baidu-map'
  Vue.component('bml-marker-clusterer', BmlMarkerClusterer)
  Vue.use(BaiduMap, {
      ak: 'GXXggBiXGv8w9VP26y4b4D0swydwBxbS'
  })
/**
 * 全局挂载 Echarts 到 $echarts
 */
 import * as echarts from "echarts";
 Vue.prototype.$echarts = echarts;
/**
 * 配置Moment 时间格式化插件
 * 定义全局时间戳过滤器
 */
 import Moment from 'moment'
 Vue.filter('formatDate', function(value) {
    //  return Moment(value).format('YYYY-MM-DD HH:mm:ss')
     return Moment(value).format('YYYY-MM-DD')
 })
 /**
 * 配置 lodash 工具类
 */
let lodash = require('lodash');
Vue.prototype.$_ = lodash;
/**
 * 全局 px 转换 rem， html 根部font-size 为16px
 */
 import './config/rem'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
