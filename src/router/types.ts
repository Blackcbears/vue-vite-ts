import type { RouteMeta, RouteRecordRaw } from "vue-router";
import { defineComponent } from "vue";

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);
export type AppRouteRecordRaw = Omit<RouteRecordRaw, "meta"> & {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Record<string, any>;
  fullPath?: string;
};

export interface Meta {
  // 名称
  title: string;
  // 是否忽略权限
  ignoreAuth?: boolean;
  permissions?: string[];
  // 是否不缓存
  noKeepAlive?: boolean;
  // 是否固定在tab上
  affix?: boolean;
  // tab上的图标
  icon?: string;
  // 跳转地址
  frameSrc?: string;
  // 外链跳转地址
  externalLink?: string;
  // 隐藏
  hidden?: boolean;
}

export interface Menu {
  title: string;
  label: string;
  key: string;
  meta: RouteMeta;
  name: string;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Record<string, any>;
  fullPath?: string;
  icon?: any;
  path: string;
  permissions?: string[];
  redirect?: string;
  sort?: number;
}
