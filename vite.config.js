// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from /playground/ for local dev
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'blockly': ['blockly'],
          'vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})