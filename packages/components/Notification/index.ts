import Notification from "./methods";
import {withInstallFunction} from '@easy-collective-ui/utils'

export const EcNotification = withInstallFunction(Notification, '$notify')

export * from './types'