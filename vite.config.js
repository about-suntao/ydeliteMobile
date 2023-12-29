import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/assets/style/main.scss";',
            },
        },
    },
    server: {
        port: 3000,
    },
})
