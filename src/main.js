import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-plus/dist/index.css'

import * as icons from '@element-plus/icons'

const app=createApp(App)
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})



app.use(store).use(router).use(ElementPlus).mount('#app')


