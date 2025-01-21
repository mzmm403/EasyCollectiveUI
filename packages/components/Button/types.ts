import { type Ref, type Component } from "vue"

// 按钮类型
export type ButtonType = 'primary' | 'success' | 'danger' | 'warning' | 'info'
// 按钮尺寸
export type ButtonSize = 'small' | 'medium' | 'large'
// 原生类型
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
    // 按钮标签类型，默认为button
    tag?: string|Component
    // 按钮类型，默认为primary
    type?: ButtonType
    // 按钮尺寸，默认为medium
    size?: ButtonSize
    // 原生类型，默认为button
    nativeType?: NativeType
    // 是否禁用，默认为false
    disabled?: boolean
    // 是否加载中，默认为false
    loading?: boolean
    // 图标，默认为空字符串
    icon?: string
    // 是否圆形，默认为false
    circle?: boolean
    // 是否圆角，默认为false
    round?: boolean
    // 是否朴素，默认为false
    plain?: boolean
    // 加载中图标，默认为空字符串
    loadingIcon?: string
    // 是否自动聚焦，默认为false
    autofocus?: boolean
    // 是否防抖，默认为false
    useThrottle?: boolean
    // 防抖时间，默认为300ms
    throttleDuration?: number
}

export interface ButtonGroupProps {
    type?: ButtonType
    size?: ButtonSize
    disabled?: boolean
}

export interface ButtonGroupContext {
    type?: ButtonType
    size?: ButtonSize
    disabled?: boolean
}

export interface ButtonEmits {
    (e: 'click', val: MouseEvent): void
}

export interface ButtonInstance {
    ref: Ref<HTMLButtonElement | void>
}