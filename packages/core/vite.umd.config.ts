import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue"
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: "dist/umd",
        lib:{
            entry: resolve(__dirname, "./index.ts"),
            name: "EasyCollectiveUI",
            fileName: "index",
            formats: ['umd']
        },
        rollupOptions: {
            external: ['vue']
        }
    }
})
