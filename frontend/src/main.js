import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/global.css';
import axios from 'axios';
import router from './router';   // 引入路由
import App from './components/App.vue';


const app = createApp(App);
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    withCredentials: true, // 允许跨域请求携带凭证
});

app.use(ElementPlus);
app.use(router);
app.config.globalProperties.$axios = axiosInstance;
app.mount('#app');