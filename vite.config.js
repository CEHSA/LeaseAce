import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// https://vitejs.dev/config/
export default defineConfig({
    base: '/form/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        cssCodeSplit: false,
        sourcemap: true,
        rollupOptions: {
            output: {
                entryFileNames: 'assets/js/[name].js',
                chunkFileNames: 'assets/js/[name].js',
                assetFileNames: function (assetInfo) {
                    var extType = (assetInfo.name.split('.').pop() || '').toLowerCase();
                    var fileName = assetInfo.name.split('/').pop() || assetInfo.name;
                    // Keep public assets at root level of /form/
                    if (fileName === 'favicon.ico' || fileName === 'aaa-logo.png' || fileName === '.htaccess') {
                        return fileName;
                    }
                    // CSS files
                    if (extType === 'css') {
                        return 'assets/css/styles.css';
                    }
                    // Images
                    if (/png|jpe?g|gif|svg|ico|webp/.test(extType)) {
                        return 'assets/images/[name][extname]';
                    }
                    // Fonts
                    if (/woff2?|eot|ttf|otf/.test(extType)) {
                        return 'assets/fonts/[name][extname]';
                    }
                    return 'assets/[name][extname]';
                }
            }
        }
    },
    css: {
        postcss: {
            plugins: [
                tailwindcss,
                autoprefixer
            ]
        }
    },
    plugins: [react()],
    server: {
        port: 3000,
        host: true,
        fs: {
            strict: false,
            allow: ['..']
        }
    },
    preview: {
        port: 3000
    },
    publicDir: 'public',
    assetsInclude: ['**/*.png'],
    optimizeDeps: {
        include: ['pdfmake']
    },
    resolve: {
        alias: {
            'pdfmake/build/vfs_fonts': 'pdfmake/build/vfs_fonts',
            '@': '/src'
        }
    },
    define: {
        'process.env': {}
    }
});
