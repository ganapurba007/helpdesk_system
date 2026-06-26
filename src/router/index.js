import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import Login from "../views/LoginView.vue";
import Register from "../views/RegisterView.vue";
import Forgot from "../views/ForgotView.vue";
import Error from "../views/404View.vue";

const route = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/forgot_password",
    name: "forgot_password",
    component: Forgot,
  },
  { path: "/:catchAll(.*)", component: Error },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: route,
});

export default router;
