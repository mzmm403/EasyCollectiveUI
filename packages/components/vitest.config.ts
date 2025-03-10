/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    define: {
        DEV: JSON.stringify(false),
        TEST: JSON.stringify(false),
        PROD: JSON.stringify(true)
    },
    test: {
        globals: true,
        environment: 'jsdom',
    }
})