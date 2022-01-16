import { createRouter, createWebHistory } from "vue-router";
import FarmInfo from "../components/farms/FarmInfo.vue";
import FarmStatistics from "../components/farmStatistics/FarmStatistics.vue";
import TheHome from "../components/TheHome.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: TheHome },
  {
    path: "/farms",
    component: FarmInfo,
  },
  { path: "/statistics", component: FarmStatistics },
  // { path: "*", redirect: "/home" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
