import { defineConfig } from "vite";
import react from "vitejs/plugin-react";
import "react";
import "react-dom";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./client",
  server: {
    port: 3000,

    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
