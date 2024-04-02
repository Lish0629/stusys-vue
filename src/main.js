import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mock from './mock/data'

//导入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



var app=createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)

//vue3中导入axios
app.mount('#app')
