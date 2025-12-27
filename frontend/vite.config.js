import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Frontend dev server port
    port: 5173,
    proxy: {
      '/api': {
        // Backend API server
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})

