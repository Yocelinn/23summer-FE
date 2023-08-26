import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import DevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
import * as icons from '@element-plus/icons'
import App from './App.vue'

const app=createApp(App)
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})
ThemeServiceInit({ infinityTheme }, 'infinityTheme');



app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(DevUI)
app.mount('#app')
