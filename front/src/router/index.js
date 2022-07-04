import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("../views/TutorialsListView.vue"),
  },
  {
    path: "/tutorial/:id",
    alias: "/tutorial",
    name: "tutorial",
    component: () => import("../views/TutorialView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
