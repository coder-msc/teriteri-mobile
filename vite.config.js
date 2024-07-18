import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windicss from 'vite-plugin-windicss';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    windicss({
      onOptionsResolved(options) {
        options.context = {
          __filename: ""
        };
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
/*  server: {
    open: true,
    host: '192.168.0.104',
    port: 3030,
    proxy: {
      "/api": {
        target: "http://192.168.0.104:8083",
        // target: "http://127.0.0.1:8083/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },*/
  define: {
    __filename: JSON.stringify('')
  }
})
