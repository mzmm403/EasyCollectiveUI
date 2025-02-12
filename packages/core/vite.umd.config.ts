import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue"
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    // 打包构建
    build: {
        // 输出目录
        outDir: "dist/umd",
        // 库模式
        lib:{
            // 入口文件
            entry: resolve(__dirname, "./index.ts"),
            // 打包项目名称
            name: "EasyCollectiveUI",
            fileName: "index",
            formats: ['umd']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue',
                },
                assetFileNames: (assetInfo) => {
                    if(assetInfo.name === "style.css") return "index.css";
                    return assetInfo.name as string;
                }
            },
        }
    }
})
