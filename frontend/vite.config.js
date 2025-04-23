import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { Target } from 'lucide-react';



export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': {
       target: 'http://localhost:5000'
      }
      
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Ensure '@' points to 'src' folder
    },
  },
});
