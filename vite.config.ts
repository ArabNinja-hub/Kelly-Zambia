import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The preview environment proxies the dev server through a sandbox host,
// so hosts are allowed and the server binds to all interfaces.
export default defineConfig({
  base: '/Kelly-Zambia/',
  plugins: [
    react(),
    {
      name: 'spa-404-fallback',
      enforce: 'post',
      generateBundle(_, bundle) {
        const indexHtml = bundle['index.html'];
        if (indexHtml && indexHtml.type === 'asset') {
          this.emitFile({
            type: 'asset',
            fileName: '404.html',
            source: indexHtml.source,
          });
        }
        this.emitFile({
          type: 'asset',
          fileName: '.nojekyll',
          source: '',
        });
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
});

