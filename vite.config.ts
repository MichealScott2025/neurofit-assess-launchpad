import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',  // Changed from '/neurofit-assess-launchpad/' to './'
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});