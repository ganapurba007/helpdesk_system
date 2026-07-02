import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Tickets from "../views/TicketsView.vue";
import TicketCreate from "../views/TicketCreateView.vue";
import TicketDetail from "../views/TicketDetailView.vue";
import TicketEdit from "../views/TicketEditView.vue";
import TicketReply from "../views/TicketReplyView.vue";
import Unauthorized from "../views/UnauthorizedView.vue";
import Profile from "../views/ProfileView.vue";
import Login from "../views/LoginView.vue";
import Register from "../views/RegisterView.vue";
import Forgot from "../views/ForgotView.vue";
import ResetPassword from "../views/ResetPasswordView.vue";
import Error from "../views/404View.vue";

const route = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/home",
    redirect: { name: "home" },
  },
  {
    path: "/tickets",
    name: "tickets",
    component: Tickets,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets/create",
    name: "ticket_create",
    component: TicketCreate,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets/:id",
    name: "ticket_detail",
    component: TicketDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets/:id/edit",
    name: "ticket_edit",
    component: TicketEdit,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets/:id/reply",
    name: "ticket_reply",
    component: TicketReply,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: Unauthorized,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
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
  {
    path: "/reset_password",
    name: "reset_password",
    component: ResetPassword,
  },
  { path: "/:catchAll(.*)", component: Error },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: route,
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return { name: "login" };
  }

  if (token && ["login", "register", "forgot_password"].includes(to.name)) {
    return { name: "home" };
  }

  return true;
});

export default router;
