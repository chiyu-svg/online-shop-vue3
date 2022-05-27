import { createRouter, createWebHistory } from "vue-router";
import { Home, Login, Register, Search } from "@/pages";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      showFooter: true
    }
  },
  {
    path: "/Login",
    component: Login,
    meta: {
      showFooter: false
    }
  },
  {
    path: "/Register",
    component: Register,
    meta: {
      showFooter: false
    }
  },
  {
    path: "/Search/:shopKey?",
    name: 'Search',
    component: Search,
    meta: {
      showFooter: true
    }
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
