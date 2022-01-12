import { createRouter, createWebHistory } from "vue-router";
import FarmInfo from "../components/farms/FarmInfo.vue";

const routes = [
  {
    path: "/",
    component: FarmInfo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
