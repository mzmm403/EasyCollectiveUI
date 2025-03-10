import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { withInstall } from "@easy-collective-ui/utils";

export const EcCollapse = withInstall(Collapse)
export const EcCollapseItem = withInstall(CollapseItem)

export * from './types'