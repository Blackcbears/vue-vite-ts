import { defineStore } from "pinia";
import { RouteLocationNormalized, RouteRecordName } from "vue-router";
import { TABS_ROUTES } from "../mutation-types";

// 不需要出现在标签页中的路由
const whiteList = ["Redirect", "login"];

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  name: RouteRecordName | null | undefined;
};

export type ITabsViewState = {
  tabsList: RouteItem[]; // 标签页
};

export const useTabsViewStore = defineStore({
  id: "app-tabs-view",
  state: (): ITabsViewState => ({
    tabsList: [],
  }),
  getters: {},
  actions: {
    initTabs(routes: RouteItem[]) {
      // 初始化标签页
      this.tabsList = routes;
    },
    addTabs(route: RouteItem): boolean {
      // 添加标签页
      if (route.name && whiteList.includes(<string>route.name)) {
        return false;
      }
      const isExists = this.tabsList.some(
        (item) => item.fullPath === route.fullPath
      );
      if (!isExists) {
        this.tabsList.push(route);
      }
      return true;
    },
    closeLeftTabs(route: RouteItem) {
      // 关闭左侧
      const index = this.tabsList.findIndex(
        (item) => item.fullPath === route.fullPath
      );
      this.tabsList.splice(0, index);
    },
    closeRightTabs(route: RouteItem) {
      // 关闭右侧
      const index = this.tabsList.findIndex(
        (item) => item.fullPath === route.fullPath
      );
      this.tabsList.splice(index + 1);
    },
    closeOtherTabs(route: RouteItem) {
      // 关闭其他
      this.tabsList = this.tabsList.filter(
        (item) => item.fullPath === route.fullPath
      );
    },
    closeCurrentTab(route: RouteItem) {
      // 关闭当前页
      const index = this.tabsList.findIndex(
        (item) => item.fullPath === route.fullPath
      );
      this.tabsList.splice(index, 1);
    },
    closeAllTabs() {
      // 关闭全部
      this.tabsList = [];
      localStorage.removeItem(TABS_ROUTES);
    },
  },
});
