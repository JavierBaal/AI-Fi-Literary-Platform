import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    // Ensure assets are properly referenced
    assetsDir: 'assets',
    // Generate sourcemaps for better debugging
    sourcemap: true,
  },
  // Ensure base path is set correctly for deployment
  base: '/',
});
