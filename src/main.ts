import { createApp } from "vue";
import { createPinia } from "pinia";
import "bulma/css/bulma.min.css";
import axios from "axios";
import vuecookies from "vue-cookies";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faArrowLeft,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faArrowLeft, faPlus, faSignInAlt, faSignOutAlt);

import "./assets/main.css";

axios.defaults.withCredentials = true;

const ToastOptions = {
  // You can set your default options here
};

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.use(vuecookies);
app.use(Toast, ToastOptions);

app.mount("#app");
