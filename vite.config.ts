import { URL, fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("lib/main.ts", import.meta.url)),
      fileName: "vue-headless-virtual-scrolling",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        assetFileNames: "vue-headless-virtual-scrolling[extname]",
      },
    },
  },
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      tsconfigPath: "tsconfig.app.json",
      copyDtsFiles: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["vue"],
  },
});
