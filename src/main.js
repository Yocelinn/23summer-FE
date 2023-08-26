

import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as icons from '@element-plus/icons-vue'
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
window.$store=store;
app.use(store)
app.use(router)
app.use(ElementPlus)
app.component('quill-editor', QuillEditor)
app.mount('#app')
