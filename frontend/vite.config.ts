import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/piapro": {
        target: "https://piapro.jp",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/piapro/, "/t"),
      },
      "/cdnPiapro": {
        target: "https://cdn.piapro.jp",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdnPiapro/, ""),
      },
    },
  },
});
