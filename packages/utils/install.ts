// 引入 Vue 中的 App 和 Plugin 类型，用于定义插件和应用实例的类型
import type { App,Plugin } from "vue"
// 从 lodash-es 库中引入 each 函数，用于遍历数组或对象。
import { each } from "lodash-es"

// 定义一个单文件组件类型SFCWithInstall，交叉类型(vue 插件类型和泛型的混合)
type SFCWithInstall<T> = T & Plugin

/**
 * 接受一个 Plugin 类型的数组 components，用于批量安装组件
 * @param componets 
 * @returns 
 */
// 定义一个导出函数 makeInstaller，接受一个 Plugin 类型的数组 components，用于批量安装组件。
export function makeInstaller(componets: Plugin[]){
    const installer = (app: App) => {
        // 使用 each 函数遍历 components 数组，将每个组件使用 app.use 方法进行安装。
        each(componets,(c) => app.use(c))
    }
    // 返回 installer 函数，作为插件。
    return installer as Plugin
}

/**
 * 接受一个泛型 T 的组件，用于给组件添加 install 方法，使其成为插件。
 * @param component  
 * @returns 
 */
// 定义一个导出函数 withInstall，接受一个泛型 T 的组件，用于给组件添加 install 方法，使其成为插件。
export const withInstall = <T>(component: T) => {
    // 给组件添加 install 方法，接受一个 App 类型的参数 app，用于将组件注册到应用实例中。
    (component as SFCWithInstall<T>).install = (app: App) => {
        // 获取组件的名称，并使用 app.component 方法将组件注册到应用实例中。
        const name = (component as any).name
        // 使用 app.component 方法将组件注册到应用实例中。
        app.component(name,component as Plugin)
    }
    // 返回组件，作为带有 install 方法的插件。
    return component as SFCWithInstall<T>
}