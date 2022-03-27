/**
 * @name: user
 * @author: CuiJing
 * @date: 2022/3/27 21:06
 * @description：
 * @update: 2022/3/27 21:06
 */
import { defineStore } from "pinia";
import { createStorage, storage } from "@/utils/Storage";
import { store } from "@/store";
import {
  ACCESS_TOKEN,
  CURRENT_USER,
  IS_LOCKSCREEN,
} from "@/store/mutation-types";
import { ResultEnum } from "@/enums/httpEnum";
import { getUserInfo, login } from "@/api/system/user";
import { ILoginParams } from "@/api/system/user/types";

const Storage = createStorage({ storage: localStorage });

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: any;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): IUserState => ({
    token: Storage.get(ACCESS_TOKEN, ""),
    username: "",
    welcome: "",
    avatar: "",
    permissions: [],
    info: Storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): object {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions: any[]) {
      this.permissions = permissions;
    },
    setUserInfo(info: any) {
      this.info = info;
    },
    // 登录
    async login(userInfo: ILoginParams) {
      try {
        const response = await login(userInfo);
        const { result, code } = response;
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000;
          storage.set(ACCESS_TOKEN, result.token, ex);
          storage.set(CURRENT_USER, result, ex);
          storage.set(IS_LOCKSCREEN, false);
          this.setToken(result.token);
          this.setUserInfo(result);
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    // 获取用户信息
    GetInfo() {
      const that = this;
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const result = res;
            if (result.permissions && result.permissions.length) {
              const permissionsList = result.permissions;
              that.setPermissions(permissionsList);
              that.setUserInfo(result);
            } else {
              reject(
                new Error("getInfo: permissionsList must be a non-null array !")
              );
            }
            that.setAvatar(result.avatar);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo("");
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
      return Promise.resolve("");
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
