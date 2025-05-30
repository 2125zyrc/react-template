import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 4000,
    proxy: {
      '^/testApi': {
        target: 'http://192.168.1.32:18080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/testApi/, ''),
      },
    },
  },
  plugins: [react()],
})
