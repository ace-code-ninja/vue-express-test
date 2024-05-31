import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import VueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
        "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Vue(),
    VueJsx(),
    Pages({
      dirs: "src/pages",
    }),
    AutoImport({
      imports: [
          "vue",
          "vue-router",
          "@vueuse/head",
          "@vueuse/core",
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/composables/**", "src/stores"],
      vueTemplate: true,
  }),
  ],
})
