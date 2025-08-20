import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    viteMockServe({
      mockPath: "mock",
      // 在Vercel环境也启用mock
      localEnabled: true,
      // 生产环境也启用mock
      prodEnabled: true,
      // 这样可以支持更多场景
      supportTs: false,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2022",
  },
});
