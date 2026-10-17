import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The preview environment proxies the dev server through a sandbox host,
// so hosts are allowed and the server binds to all interfaces.
export default defineConfig({
  plugins: [react()],
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
