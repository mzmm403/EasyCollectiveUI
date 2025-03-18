import ConfigProvider from "./ConfigProvider.vue";
import { withInstall } from '@easy-collective-ui/utils'

export const EcConfigProvider = withInstall(ConfigProvider)

export * from './types'
export * from './hooks'