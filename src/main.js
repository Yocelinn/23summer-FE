

import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as icons from '@element-plus/icons-vue'
import App from './App.vue'
import axios from 'axios';


import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import VueDragResizeRotate from "@gausszhou/vue3-drag-resize-rotate";
import "@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css";

axios.defaults.baseURL='http://81.70.184.77:8000'
axios.interceptors.request.use(
    config => {
     config.headers.Authorization = window.localStorage.getItem('token')
     console.log(localStorage.getItem('token'))
     console.log(config)
 return config 
})
 
const app=createApp(App)
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})
window.$store=store;
app.use(store)
app.use(router)
app.use(ElementPlus)
app.component('quill-editor', QuillEditor)

app.use(VueDragResizeRotate)

app.mount('#app')
