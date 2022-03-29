/**
 * @name: types.ts
 * @author: CuiJing
 * @date: 2022/3/27 14:55
 * @description：
 * @update: 2022/3/27 14:55
 */
export interface ILoginParams {
  userName: string;
  passWord: string | number;
}
/**
 * 返回数据
 */
export interface ILoginRequest {
  token: string;
}
