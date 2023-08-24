import { createApp } from 'vue'
<<<<<<< HEAD
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
=======
>>>>>>> Terry_x
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import DevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';

<<<<<<< HEAD
import 'element-plus/dist/index.css'

import * as icons from '@element-plus/icons'

const app=createApp(App)
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})



app.use(store).use(router).use(ElementPlus).mount('#app')


=======
ThemeServiceInit({ infinityTheme }, 'infinityTheme');
import App from './App.vue'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(DevUI)
app.mount('#app')
>>>>>>> Terry_x
