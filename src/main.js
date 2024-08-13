import { createApp } from 'vue';
import './style.css'
import App from './App.vue';
import router from "./router/index.js";
import store from './store/index.js';
import { Icon } from '@iconify/vue';
import NavBar from './components/shared/NavBar.vue';
import Cart from './components/shared/Cart.vue';
import { createPinia } from 'pinia';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const app = createApp(App);
const pinia = createPinia();
app.component("VueIcon", Icon);
app.component("NavBar", NavBar);
app.component("Cart", Cart);
app.use(router);
app.use(store);
app.use(pinia);
app.mount('#app');