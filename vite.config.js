import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5500
  },
  build: {
    assetsDir: 'assets'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.spec.js'],
    deps: {
      inline: ['element-plus']
    }
  }
})
