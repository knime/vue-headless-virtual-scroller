import { URL, fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: "demo",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@knime/vue-headless-virtual-scroller": fileURLToPath(
        new URL("./lib/main.ts", import.meta.url),
      ),
    },
  },
});
