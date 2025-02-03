import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/facteur.scan/', // Ajout du chemin du dépôt GitHub Pages
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
