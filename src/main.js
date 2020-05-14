import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {router} from '../router'
import {store} from  '../store/store';
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false;



Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.VUE_APP_SERVER_URL,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  sockets: {
    product: data => {
      console.log('product created' + data)
    }
  }
}));

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
