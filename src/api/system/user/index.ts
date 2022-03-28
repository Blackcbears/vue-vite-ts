/**
 * @name: user
 * @author: CuiJing
 * @date: 2022/3/27 21:12
 * @description：
 * @update: 2022/3/27 21:12
 */
import { http } from "@/utils/http/axios";
import { RequestEnum } from "@/enums/httpEnum";
import { ILoginParams, ILoginRequest } from "@/api/system/user/types";
import { BasicResponseModel } from "@/api/type";

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: "/admin_info",
    method: RequestEnum.GET,
  });
}

/**
 * @description: 用户登录
 */
export const login = (params: ILoginParams) => {
  return http.request<BasicResponseModel<ILoginRequest>>(
    {
      url: "/login",
      method: RequestEnum.POST,
      params,
    },
    {
      isTransformResponse: false,
    }
  );
};
