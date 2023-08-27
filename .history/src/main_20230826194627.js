

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
// import Ripple from 'vue-devui/ripple'
// import 'vue-devui/ripple/style.css'

import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
import * as icons from '@element-plus/icons'
import App from './App.vue'
// axios 不需要use 到时候直接用

// axios 不需要引用 到时候直接用
// import axios from 'axios'
//例如
// axios({
//     method: 'post',
//     url: '/user/12345',
//     data: {
//         firstName: 'Fred',
//         lastName: 'Flintstone'
//     }
// });

// import VueAxios from 'vue-axios'
// import VueQuillEditor from 'vue-quill-editor'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const app = createApp(App)
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
// app.use(Ripple)
app.config.globalProperties.$message = ElMessage;
// app.use(DevUI)
app.component('quill-editor', QuillEditor)
app.mount('#app')
window.$store = store;
