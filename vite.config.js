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
  define: {
    __filename: JSON.stringify('')
  }
})
