import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defaultConfig, plugin } from "@formkit/vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAddressBook,
  faAngleDown,
  faAngleLeft,
  faArrowDown,
  faArrowLeft,
  faArrowRightFromBracket,
  faArrowRotateRight,
  faBan,
  faBars,
  faCheck,
  faCheckCircle,
  faCircleNotch,
  faGear,
  faMessage,
  faTriangleExclamation,
  faUserXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FloatingVue from "floating-vue";
import Toast, { type PluginOptions, POSITION } from "vue-toastification";


import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

library.add(
  faAddressBook,
  faGear,
  faBars,
  faAngleLeft,
  faMessage,
  faXmark,
  faCheck,
  faAngleDown,
  faUserXmark,
  faBan,
  faCircleNotch,
  faCheckCircle,
  faTriangleExclamation,
  faArrowLeft,
  faArrowRightFromBracket,
  faArrowRotateRight,
  faArrowDown
);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);
const ToastOptions: PluginOptions = {
  position: POSITION.TOP_CENTER,
  transition: "Vue-Toastification__fade",
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};
app.use(Toast, ToastOptions);
app.use(FloatingVue);
app.mount("#app");
