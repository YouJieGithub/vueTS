import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import tsImportPluginFactory from "ts-import-plugin";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tsImportPluginFactory({
      libraryName: "vantBase",
      libraryDirectory: "es",
      style: true,
    }),
    // importToCDN({
    //   modules: [
    //     {
    //       name: "",
    //       var: "",
    //       path: ``,
    //     },
    //     {
    //       name: "",
    //       var: "",
    //       path: ``,
    //     },
    //   ],
    // }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  server: {
    port: 3000,
    open: false, //自动打开
    base: "./ ", //生产环境路径
    proxy: {
      "^/api": {
        target: "http://192.168.0.100:9094/dxe/mobile", // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
