import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => ({
  // <— GitHub Pages needs this exact path
  base: '/neurofit-assess-launchpad/',

  server: {
    host: '::',
    port: 8080,
  },

  plugins: [
    react(),
    mode === 'development' && componentTagger(),  // only in dev
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));

