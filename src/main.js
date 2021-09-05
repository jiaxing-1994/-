import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import previewCode from './components/previewCode/index.vue';
import icon from './components/icon/index.vue';
import './iconSymbol';

createApp(App)
  .use(store)
  .use(Vant)
  .use(router)
  .component('previewCode', previewCode)
  .component('icon', icon)
  .mount('#app')
