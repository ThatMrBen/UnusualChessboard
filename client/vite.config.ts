import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@games': path.resolve(__dirname, './src/games'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@router': path.resolve(__dirname, './src/router'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 5180,
    host: true, // 允许外部访问
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
    // 开发服务器优化
    hmr: {
      overlay: false, // 禁用错误覆盖层，避免开发时频繁弹窗
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV !== 'production',
    chunkSizeWarningLimit: 1600,
    // 代码分割优化
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 React 相关库单独打包
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // 将状态管理库单独打包
          'state-vendor': ['zustand'],
          // 将国际化库单独打包
          'i18n-vendor': ['i18next', 'react-i18next'],
          // 将 UI 库单独打包
          'ui-vendor': ['daisyui'],
          // 将工具库单独打包
          'utils-vendor': ['axios'],
        },
        // 文件名优化
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name || '')) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name || '')) {
            return `images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    // 压缩优化
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production', // 生产环境移除 console
        drop_debugger: process.env.NODE_ENV === 'production', // 生产环境移除 debugger
      },
    },
    // 目标浏览器优化
    target: 'es2015',
    // CSS 代码分割
    cssCodeSplit: true,
  },
  // 预构建优化
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'i18next',
      'react-i18next',
      'axios',
      'daisyui',
    ],
    exclude: ['@types/*'],
  },
  // 缓存优化
  cacheDir: 'node_modules/.vite',
  // 环境变量处理
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
    __PROD__: process.env.NODE_ENV === 'production',
  },
}); 