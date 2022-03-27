import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import { setupDirectives } from "@/plugins/directives";

const app = createApp(App);
app.use(router);
app.use(createPinia());
// 增加组件
setupDirectives(app);
app.mount("#app");
