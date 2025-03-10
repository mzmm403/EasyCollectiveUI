// 这个插件实际上就用到了两个生命周期,
// 在vite的自定义插件中一般有两种生命周期，vite独有的钩子和通用钩子(一般就是rollup的钩子)
// 这个插件是想在打包的时候把上一次打包的css分割出去的产物删除,然后在打包结束的时候把打包后的产物移动到指定目录
// 所以这里用到了通用钩子buildStart和buildEnd

import {each,isFunction} from 'lodash-es'
import shell from 'shelljs'

export default function hooksPlugin({
    rmFiles = [],
    beforeBuild,
    afterBuild,
}:{
    rmFiles?:string[];
    beforeBuild?:Function;
    afterBuild?:Function;
}){
    return {
        // 插件的名字
        name: 'hooks-plugin',
        buildStart(){
            each(rmFiles,(fName) => shell.rm("-rf",fName));
            isFunction(beforeBuild) && beforeBuild();
        },
        buildEnd(err?:Error){
            !err && isFunction(afterBuild) && afterBuild();
        }
    }
}