import { createRouter, createWebHistory } from "vue-router";
import FarmInfo from "../components/farms/FarmInfo.vue";
import FarmStatistics from "../components/farmStatistics/FarmStatistics.vue";

const routes = [
  {
    path: "/farms",
    component: FarmInfo,
  },
  { path: "/statistics", component: FarmStatistics },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
