import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/ChatView.vue"),
    },
    {
      path: "/chat/:chat_id",
      name: "chatroom",
      component: () => import("../views/ChatRoomView.vue"),
    },
    {
      path: "/joinChatRoom",
      name: "joinChatRoom",
      component: () => import("../views/JoinChatRoomView.vue"),
    },
    {
      path: "/createChatRoom",
      name: "createChatRoom",
      component: () => import("../views/CreateChatRoomView.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("../views/LogoutView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/signup", "/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("x-access-token");

  if (authRequired && !loggedIn) {
    toast.warning("You must be logged in to view this page");
    return next("/login");
  }

  next();
});

export default router;
