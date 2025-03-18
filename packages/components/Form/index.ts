import Form from "./Form.vue";
import FormItem from "./FormItem.vue";
import { withInstall } from "@easy-collective-ui/utils";

export const EcForm = withInstall(Form);
export const EcFormItem = withInstall(FormItem);

export * from "./types";
export * from "./hooks";