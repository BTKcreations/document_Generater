// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/document_Generater/', // Ensure this matches your GitHub repo name
  plugins: [react()],
  build: {
    outDir: 'dist' // Ensure this is set to 'dist'
  }
});
