import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, {key} from './store'
import '@/mock/mockServer'
import "swiper/less";
import "swiper/less/navigation";
import "swiper/less/pagination";

const app =  createApp(App);
app.use(router);
app.use(store,key);
app.mount('#app')
