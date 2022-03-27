/**
 * @name: types.ts
 * @author: CuiJing
 * @date: 2022/3/27 21:08
 * @description：
 * @update: 2022/3/27 21:08
 */
import { IUserState } from "@/store/modules/user";

export interface IStore {
  user: IUserState;
  count: number;
}
