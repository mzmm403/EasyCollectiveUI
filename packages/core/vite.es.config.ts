import { defineConfig } from 'vite'
import { map, filter, delay } from "lodash-es";
import { readdirSync } from 'fs'
import { resolve } from 'path'

import shell from 'shelljs'
import vue from "@vitejs/plugin-vue"
import dts from 'vite-plugin-dts'
import hooks from './hooksPlugin';
import terser from '@rollup/plugin-terser'

// const COMP_NAMES = [
//     "Alert",
//     "Button",
//     "Collapse",
//     "Dropdown",
//     "Form",
//     "Icon",
//     "Input",
//     "Loading",
//     "Message",
//     "MessageBox",
//     "Notification",
//     "Overlay",
//     "Popconfirm",
//     "Select",
//     "Switch",
//     "Tooltip",
//     "Uplaod",
// ] as const;

const TRY_MOVE_STYLES_DELAY = 800 as const

// 定义三个环境
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';


// 读取指定目录下的所有目录名称
function getDirectoriesSync(basePath: string) {
    const entires = readdirSync(basePath, { withFileTypes: true });

    return map(
        filter(entires,(entry) => entry.isDirectory()),
        (entry) => entry.name
    )
}


function moveStyles(){
    try{
        readdirSync('./dist/es/theme')
        shell.mv("./dist/es/theme","./dist")
    }catch(_){
        delay(moveStyles,TRY_MOVE_STYLES_DELAY)
    }
}



export default defineConfig({
    plugins: [
        vue(),
        dts({
                tsconfigPath: "../../tsconfig.build.json",
                outDir: "dist/types"
        }),
        hooks({
            rmFiles:['./dist/es','./dist/theme','./dist/types'],
            afterBuild: moveStyles 
        }),
        terser({
            compress: {
                sequences: isProd,
                arguments: isProd,
                drop_console: isProd && ["log"],
                drop_debugger: isProd,
                passes: isProd ? 4 : 1,
                global_defs:{
                    "@DEV": JSON.stringify(isDev),
                    "@TEST": JSON.stringify(isTest),
                    "@PROD": JSON.stringify(isProd)
                },
            },
            format: {
                semicolons: false,
                shorthand: isProd,
                braces: !isProd,
                beautify: !isProd,
                comments: !isProd,
            },
            mangle: {
                toplevel: isProd,
                eval: isProd,
                keep_classnames: isDev,
                keep_fnames: isDev,
            }
        })
    ],
    // 打包构建
    build: {
        // 输出目录
        outDir: "dist/es",
        // css代码分割
        cssCodeSplit: true,
        // 
        minify: false,
        // 库模式
        lib:{
            // 入口文件
            entry: resolve(__dirname, "./index.ts"),
            // 打包项目名称
            name: "EasyCollectiveUI",
            fileName: "index",
            formats: ['es']
        },
        rollupOptions: {
            external: [
                'vue',
                "@fortawesome/fontawesome-svg-core",
                "@fortawesome/free-solid-svg-icons",
                "@fortawesome/vue-fontawesome",
                "@popperjs/core",
                "async-validator"
            ],
            output: {
                assetFileNames: (assetInfo) => {
                    if(assetInfo.name === "style.css") return "index.css";
                    if(
                        assetInfo.type === "asset" && 
                        /\.(css)$/i.test(assetInfo.name as string)
                    ){
                        return 'theme/[name].[ext]'
                    }
                    return assetInfo.name as string;
                },
                manualChunks(id){
                    if(id.includes('node_modules')){
                        return "vendor"
                    }
                    if(id.includes("packages/hooks")){
                        return "hooks"
                    }
                    if(id.includes("packages/utils") || id.includes("plugin-vue:export-helper")){
                        return "utils"
                    }
                    for (const item of getDirectoriesSync("../components")) {
                        if(id.includes(`packages/components/${item}`)){
                            return item
                        }
                    }
                },
            },
        }
    }
})
