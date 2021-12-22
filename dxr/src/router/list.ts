import { RouteRecordRaw } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    //标题
    title: string;
    // 是可选的
    isAdmin?: boolean;
  }
}
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    component: () => import("@/view/login/login.vue"),
  },
  {
    path: "/home",
    name: "home",
    meta: { title: "首页" },
    component: () => import("@/view/home/home.vue"),
  },
  {
    path: "/",
    name: "register",
    meta: { title: "注册" },
    component: () => import("@/view/register/register.vue"),
  },
  {
    path: "/salary",
    name: "salary",
    meta: { title: "银行卡" },
    component: () => import("@/view/salary/salarycard.vue"),
  },
  {
    path: "/addsalary",
    name: "addsalary",
    meta: { title: "银行卡" },
    component: () => import("@/view/salary/addsalarycard.vue"),
  },
  {
    path: "/personnel",
    name: "personnel",
    meta: { title: "人员管理" },
    component: () => import("@/view/personnel/personnel.vue"),
  },
  {
    path: "/singledetail",
    name: "singledetail",
    meta: { title: "单量分析" },
    component: () => import("@/view/single/singledetail.vue"),
  },
  {
    path: "/singleanalyze",
    name: "singleanalyze",
    meta: { title: "单量详情" },
    component: () => import("@/view/single/singleanalyze.vue"),
  },
];
