import Vue from 'vue'
import App from './App.vue'

//引入路由模块
import router from '@/router/index.js'


//引入默认样式
import '@/style/reset.css';
import '@/style/index.less';
//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false




new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
