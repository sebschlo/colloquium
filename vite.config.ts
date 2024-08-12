import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        zine: resolve(__dirname, 'zine.html'),
        map: resolve(__dirname, 'top_20_places_map.html'),
        archive: resolve(__dirname, 'archive.html'),
        bb_map: resolve(__dirname, 'billboard_map.html'),
        lw_map: resolve(__dirname, 'light_well_map.html'),
      },
    },
  },
});