import { createRouter, createWebHistory } from "vue-router";
import { Home, Login, Register, Search, Detail, CarSuccess, ShopCar } from "@/pages";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/Login",
    component: Login,
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/Register",
    component: Register,
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/Search/:shopKey?",
    name: "Search",
    component: Search,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/Detail/:shopId?",
    name: "Detail",
    component: Detail,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/CarSuccess",
    name: "CarSuccess",
    component: CarSuccess,
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/ShopCar",
    name: "ShopCar",
    component: ShopCar,
    meta: {
      showFooter: true,
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
