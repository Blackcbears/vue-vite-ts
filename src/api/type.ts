/**
 * @name: type
 * @author: CuiJing
 * @date: 2022/3/28 22:15
 * @description：
 * @update: 2022/3/28 22:15
 */
export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}
