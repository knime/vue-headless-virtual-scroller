import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["src/**/__tests__/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      environment: "jsdom",
      setupFiles: [fileURLToPath(new URL("vitest.setup.ts", import.meta.url))],
      root: fileURLToPath(new URL("./", import.meta.url)),
      coverage: {
        all: true,
        exclude: [
          "coverage/**",
          "dist/**",
          "lib/**",
          "src/demo/**",
          "webapps-common/**",
          "**/*.d.ts",
          "**/__tests__/**",
          "**/{vite,vitest,postcss,lint-staged}.config.{js,cjs,mjs,ts}",
          "**/.{eslint,prettier,stylelint}rc.{js,cjs,yml}",
          "**/types/**",
          "**/dev/**",
        ],
        reporter: ["html", "text", "lcov"],
      },
      outputFile: {
        junit: "test-results/junit.xml", // needed for Bitbucket Pipeline, see https://support.atlassian.com/bitbucket-cloud/docs/test-reporting-in-pipelines/
      },
    },
  }),
);
