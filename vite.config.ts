// @ts-ignore
import path from "path";
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import { OUTPUT_DIR } from "./build/constant";
import { wrapperEnv } from "./build/utils";
import { createVitePlugins } from "./build/vite/plugin";
import { createProxy } from "./build/vite/proxy";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const {
    VITE_PUBLIC_PATH,
    VITE_DROP_CONSOLE,
    VITE_PORT,
    VITE_GLOB_PROD_MOCK,
    VITE_PROXY,
  } = viteEnv;
  const prodMock = VITE_GLOB_PROD_MOCK;
  const isBuild = command === "build";
  return {
    base: VITE_PUBLIC_PATH,
    plugins: createVitePlugins(viteEnv, isBuild, prodMock),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@api": path.resolve(__dirname, "src/api"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/var.scss";',
        },
      },
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };
});
