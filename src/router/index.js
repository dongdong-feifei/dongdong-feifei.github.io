/*
 * @Author: wuhuidong && davewuhuidong_i@didilobal.com
 * @Date: 2024-08-19 15:27:22
 * @LastEditors: wuhuidong && davewuhuidong_i@didilobal.com
 * @LastEditTime: 2024-08-21 17:17:22
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home/Home.vue"),
  },
  {
    path: "/jobs",
    name: "jobs",
    component: () => import("../views/Jobs/Jobs.vue"),
  },
  {
    path: "/jobs/:id",
    name: "jobDetail",
    component: () => import("../views/JobDetail/JobDetail.vue"),
  },
  {
    path: "/staff-stories/:id",
    name: "staff-stories",
    component: () => import("../views/StaffStories/StaffStories.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/Products/Products.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/User/User.vue"),
  },
  {
    path: "/knowledge",
    name: "knowledge",
    component: () => import("../views/knowledge/knowledge.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/Test/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
