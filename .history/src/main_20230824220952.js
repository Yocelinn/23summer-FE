import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(DevUI)
app.mount('#app')