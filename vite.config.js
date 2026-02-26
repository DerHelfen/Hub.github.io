import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react()],
    base: isProduction ? "/Hub.github.io/" : "/",
    server: {
      port: 5173,
      open: true,
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
    },
  };
});
