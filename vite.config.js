import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./dist", // 设置为相对路径
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js", // 这里指定 Vue 的解析路径
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${path.resolve(
          __dirname,
          "src/assets/style/variable.less"
        )}";`,
        javascriptEnabled: true,
      },
    },
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        404: path.resolve(__dirname, "404.html"),
      },
      output: {
        entryFileNames: "dist/assets/[name]-[hash].js", // JS 入口文件路径
        chunkFileNames: "dist/assets/[name]-[hash].js", // 代码分块路径
        assetFileNames: "dist/assets/[name]-[hash][extname]", // 其他静态资源路径
      },
    },
  },
});
