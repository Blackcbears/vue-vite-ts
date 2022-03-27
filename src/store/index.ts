/**
 * @name: index
 * @author: CuiJing
 * @date: 2022/3/27 21:08
 * @description：
 * @update: 2022/3/27 21:08
 */
import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
