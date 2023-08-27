import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import DevUI from 'vue-devui';
// import 'vue-devui/style.css';

import Dropdown from 'vue-devui'
import 'vue-devui/dropdown/style.css'
import Button from 'vue-devui'
import 'vue-devui/button/style.css'
import Splitter from 'vue-devui/splitter'
import 'vue-devui/splitter/style.css'
import Modal from 'vue-devui/modal'
import 'vue-devui/modal/style.css'
import Input from 'vue-devui/input'
import 'vue-devui/input/style.css'
import Table from 'vue-devui/table'
import 'vue-devui/table/style.css'
import Card from 'vue-devui/card'
import 'vue-devui/card/style.css'
// import Ripple from 'vue-devui/ripple'
// import 'vue-devui/ripple/style.css'

import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
import * as icons from '@element-plus/icons'
import App from './App.vue'
import axios from 'axios';


import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import VueDragResizeRotate from "@gausszhou/vue3-drag-resize-rotate";
import "@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css";

axios.defaults.baseURL='http://81.70.184.77:8000'
axios.interceptors.request.use(
    config => {
        config.headers.Authorization = window.sessionStorage.getItem('token')
        //  console.log(localStorage.getItem('token'))
        //  console.log(config)
        return config
    })
 
const app= createApp(App)
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})
ThemeServiceInit({ infinityTheme }, 'infinityTheme');

import { ElMessage } from 'element-plus';
app.use(store)
app.use(router)
app.use(ElementPlus)

app.use(Dropdown)
app.use(Button)
app.use(Splitter)
app.use(Modal)
app.use(Input)
app.use(Table)
app.use(Card)
// app.use(Ripple)
app.config.globalProperties.$message = ElMessage;
// app.use(DevUI)
app.component('quill-editor', QuillEditor)

app.use(VueDragResizeRotate)

app.mount('#app')
window.$store = store;
