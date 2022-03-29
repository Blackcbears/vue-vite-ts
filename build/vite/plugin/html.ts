/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import { createHtmlPlugin } from "vite-plugin-html";

import pkg from "../../../package.json";
import { GLOB_CONFIG_FILE_NAME } from "../../constant";
import { ViteEnv } from "../../type";

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;

  const path = VITE_PUBLIC_PATH.endsWith("/")
    ? VITE_PUBLIC_PATH
    : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () => {
    return `${path || "/"}${GLOB_CONFIG_FILE_NAME}?v=${
      pkg.version
    }-${new Date().getTime()}`;
  };

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_GLOB_APP_TITLE,
        injectScript: `<script src="./inject.js"></script>`,
      },
      // Embed the generated app.config.js file
      tags: isBuild
        ? [
            {
              tag: "script",
              attrs: {
                src: getAppConfigSrc(),
              },
            },
          ]
        : [],
    },
  });
}
