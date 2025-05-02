import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./",            // ensures paths are relative
  build: {
    outDir: "docs",      // <-- put the build here
    emptyOutDir: true,   // <-- delete old files each build
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
