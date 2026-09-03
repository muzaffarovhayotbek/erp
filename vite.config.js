import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // MUHIM: link ko‘rinishi uchun
    port: 5173,        // aniq port
    open: true,        // brauzerni o‘zi ochadi
    proxy: {
      "/api": {
        target: "http://16.171.1.84",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});