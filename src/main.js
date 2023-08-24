import { createApp } from 'vue'
import router from './router'
import store from './store'
import Dropdown from 'vue-devui/dropdown';
import 'vue-devui/dropdown/style.css';
import Button from 'vue-devui/button';
import 'vue-devui/button/style.css'
import Splitter from 'vue-devui/splitter';
import 'vue-devui/splitter/style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Table from 'vue-devui/table';
import 'vue-devui/table/style.css';
import DevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';

ThemeServiceInit({ infinityTheme }, 'infinityTheme');
import App from './App.vue'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Dropdown)
app.use(Button)
app.use(Splitter)
app.use(ElementPlus)
app.use(DevUI)
app.use(Table)
app.mount('#app')