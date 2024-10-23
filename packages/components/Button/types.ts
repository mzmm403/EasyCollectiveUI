import { type Ref, type Component } from "vue"

export type ButtonType = 'primary' | 'success' | 'danger' | 'warning' | 'info'
export type ButtonSize = 'small' | 'medium' | 'large'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
    tag?: string|Component
    type?: ButtonType
    size?: ButtonSize
    nativeType?: NativeType
    disabled?: boolean
    loading?: boolean
    icon?: string
    circle?: boolean
    round?: boolean
    plain?: boolean
    loadingIcon?: string
    autofocus?: boolean
    useThrottle?: boolean
    throttleDuration?: number
}


export interface ButtonEmits {
    (e: 'click', val: MouseEvent): void
}

export interface ButtonInstance {
    ref: Ref<HTMLButtonElement | void>
}