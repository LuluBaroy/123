import { createApp } from "vue";
import App from "./App.vue";
import router from './router'
import VueCookies from 'vue3-cookies'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import store from './store'
import "./assets/main.css";

const app = createApp(App);

app.use(router).use(VueSweetalert2).use(VueCookies).use(store);

app.mount("#app");
