import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.config.productionTip = false
Vue.mixin({
  data() {
    return {
      myColor:"#e54b43"
    }
  },
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
