import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Forward /api calls to `npm run dev:api` (wrangler pages dev) during local development
    proxy: { '/api': 'http://127.0.0.1:8788' },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
