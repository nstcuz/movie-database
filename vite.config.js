import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cheeseboard-cinema/',
  build: {
    outDir: 'cheeseboard-cinema'
  },
  plugins: [react()],
})
