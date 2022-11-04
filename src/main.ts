import { createApp } from "vue";
import { createPinia } from "pinia";
import "bulma/css/bulma.min.css";
import axios from "axios";
import vuecookies from "vue-cookies";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

axios.defaults.withCredentials = true;

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuecookies);

app.mount("#app");
