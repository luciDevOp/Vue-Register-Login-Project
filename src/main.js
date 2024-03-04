import { createApp } from 'vue'; 
import App from './App.vue';
import router from './routes';
import  {store} from './store/store';
import axios from 'axios';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App); 

app.use(router); 
app.use(store)

const token = localStorage.getItem('accessToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
app.use(ElementPlus);
app.mount('#app'); 
