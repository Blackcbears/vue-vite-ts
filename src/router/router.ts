/**
 * @name: router
 * @author: CuiJing
 * @date: 2022/3/27 14:51
 * @description：
 * @update: 2022/3/27 14:51
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/pages/login/index.vue"), // 注意这里要带上 文件后缀.vue
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
