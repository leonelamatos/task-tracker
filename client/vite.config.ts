import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd());

 return {
  plugins: [ react(), tsconfigPaths(), ],
   base: '/',

  server: {
    origin: '0.0.0.0:8080',
    port:8080,
    host: true,
    
   
    proxy: {
      "/api/": {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
        
      }
    }
  },
   build: { manifest: true, },
}
})
