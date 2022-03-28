import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { setupDirectives } from "@/plugins/directives";
import { setupRouter } from "@/router";
import "./styles/tailwind.css";
// 防止tailwind的样式覆盖问题
const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

const app = createApp(App);
app.use(router);
app.use(createPinia());
// 增加组件
setupDirectives(app);
await setupRouter(app);
// 路由准备就绪后挂载APP实例
await router.isReady();
app.mount("#app");
