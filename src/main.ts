import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import apolloProvider from './apollo'


Vue.config.productionTip = false


import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

new Vue({
    router,
    store,
    apolloProvider,
    render: h => h(App)
}).$mount('#app')
