// 存放常量的文件夹
import type {InjectionKey} from 'vue'
import type { ButtonGroupContext } from './types'

export const BUTTON_GROUP_CXT_KEY: InjectionKey<ButtonGroupContext> = Symbol(
    'BUTTON_GROUP_CXT_KEY'
)