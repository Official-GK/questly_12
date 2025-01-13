import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/questly_12/',
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle: async () => {
        await fs.copy(
          path.resolve(__dirname, 'public/404.html'),
          path.resolve(__dirname, 'dist/404.html')
        )
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  optimizeDeps: {
    include: ['@/components/ui/sonner']
  }
})
