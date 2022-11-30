import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteCompression from "vite-plugin-compression";

import Pages from "vite-plugin-pages";
import generateSitemap from "vite-plugin-pages-sitemap";

export default () => {
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      viteCompression({ algorithm: "brotliCompress", deleteOriginFile: false }),
      // Compress index.js and index.css with brotli
      Pages({
        onRoutesGenerated: (routes) => {
          generateSitemap({
            hostname: "https://chat.karasu.es",
            routes,
            changefreq: "daily",
            priority: 0.5,
          });
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      chunkSizeWarningLimit: 1000,
    },
  });
};

// https://vitejs.dev/config/
/*
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
*/
