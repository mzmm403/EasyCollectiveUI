import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue"
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { map, filter } from "lodash-es";
import { readdirSync } from 'fs'


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


// 读取指定目录下的所有目录名称
function getDirectoriesSync(basePath: string) {
    const entires = readdirSync(basePath, { withFileTypes: true });

    return map(
        filter(entires,(entry) => entry.isDirectory()),
        (entry) => entry.name
    )
}



export default defineConfig({
    plugins: [
        vue(),
        dts({
                tsconfigPath: "../../tsconfig.build.json",
                outDir: "dist/types"
        })
    ],
    // 打包构建
    build: {
        // 输出目录
        outDir: "dist/es",
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
                    return assetInfo.name as string;
                },
                manualChunks(id){
                    if(id.includes('node_modules')){
                        return "vendor"
                    }
                    if(id.includes("packages/hooks")){
                        return "hooks"
                    }
                    if(id.includes("packages/utils")){
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
