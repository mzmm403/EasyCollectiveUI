import { defineConfig } from 'vite'
import { readFileSync } from "fs"
import { resolve } from 'path'
import {delay} from "lodash-es"
import { compression } from "vite-plugin-compression2"

import shell from "shelljs"
import vue from "@vitejs/plugin-vue"
import hooks from './hooksPlugin'
import terser from '@rollup/plugin-terser'

const TRY_MOVE_STYLES_DELAY = 800 as const

// 定义三个环境
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

function moveStyles(){
    try{
        readFileSync('./dist/umd/index.css.gz')
        shell.cp("./dist/umd/index.css","./dist/index.css")
    }catch(_){
        delay(moveStyles,TRY_MOVE_STYLES_DELAY)
    }
}


export default defineConfig({
    plugins: [
        vue(),
        compression({
            include: /.(cjs|css)$/i,
        }),
        terser({
            compress: {
                drop_console: ["log"],
                drop_debugger: true,
                passes: 3,
                global_defs:{
                    "@DEV": JSON.stringify(isDev),
                    "@TEST": JSON.stringify(isTest),
                    "@PROD": JSON.stringify(isProd)
                },
            },
        }),
        hooks({
            rmFiles:["./dist/umd","./dist/index.css"],
            afterBuild: moveStyles,
        })
    ],
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
