<script setup lang="ts">
import type {
    FormItemContext,
    FormItemProps,
    FormValidateFailuer,
    FormValidateCallback,
    ValidateStatus,
    FormItemInstance,
    FormItemRule,
} from "./types";
import Schema, { type RuleItem } from "async-validator";
import {
    type Ref,
    ref,
    inject,
    onMounted,
    reactive,
    toRefs,
    computed,
    nextTick,
    onUnmounted,
    provide,
} from "vue";
import {
    isNil,
    get,
    isString,
    size,
    filter,
    map,
    includes,
    keys,
    isArray,
    cloneDeep,
    some,
    isNumber,
    endsWith,
} from "lodash-es";
import { useId } from "@easy-collective-ui/hooks";

import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constants";

defineOptions({ name: "EcFormItem" });

const props = withDefaults(defineProps<FormItemProps>(), {
    required: void 0,
    showMessage: true,
});
const slots = defineSlots();
const ctx = inject(FORM_CTX_KEY);

const labelId = useId().value;

const validateStatus: Ref<ValidateStatus> = ref("init");
const errMsg = ref("");
const inputIds = ref<string[]>([]);

const getValByProp = (target: Record<string, any> | void) => {
    if (target && props.prop && !isNil(get(target, props.prop))) {
        return get(target, props.prop);
    }
    return null;
};

const hasLabel = computed(() => !!(props.label || slots.label));
const labelFor = computed(
    () => props.for || (inputIds.value.length ? inputIds.value[0] : "")
);

const currentLabel = computed(
    () => `${props.label ?? ""}${ctx?.labelSuffix ?? ""}`
);

const normalizeLabelWidth = computed(() => {
    const _normalizeStyle = (val: number | string) => {
        if (isNumber(val)) return `${val}px`;
        return endsWith(val, "px") ? val : `${val}px`;
    };
    if (props.labelWidth) return _normalizeStyle(props.labelWidth);
    if (ctx?.labelWidth) return _normalizeStyle(ctx?.labelWidth);
    return "150px";
});

const isDisabled = computed(() => ctx?.disabled || props.disabled);
const isRequired = computed(
    () =>
        (!ctx?.hideRequiredAsterisk && some(itemRules.value, "required")) ||
        props?.required
);
const innerVal = computed(() => {
    const model = ctx?.model;
    return getValByProp(model);
});
const propString = computed(() => {
    if (!props.prop) return "";
    return isString(props.prop) ? props.prop : props.prop.join(".");
});

const itemRules = computed(() => {
    const { required } = props;
    const rules: FormItemRule[] = [];
    if (props.rules) {
        rules.push(...props.rules);
    }
    const formRules = ctx?.rules;
    if (formRules && props.prop) {
        const _rules = getValByProp(formRules);
        if (_rules) {
            rules.push(..._rules);
        }
    }

    if (!isNil(required)) {
        const requiredRules = filter(
            map(rules, (rule, i) => [rule, i]),
            (item: [FormItemRule, number]) => includes(keys(item[0]), "required")
        );

        if (size(requiredRules)) {
            for (const item of requiredRules) {
                const [rule, i] = item as [FormItemRule, number];
                if (rule.required === required) continue;
                rules[i] = { ...rule, required };
            }
        } else {
            rules.push({ required });
        }
    }

    return rules;
});

let initialVal: any = null;
let isResetting: boolean = false;

function getTriggeredRules(trigger: string) {
    const rules = itemRules.value;
    if (!rules) return [];

    return filter(rules, (r) => {
        if (!r?.trigger || !trigger) return true;
        if (isArray(r.trigger)) {
            return r.trigger.includes(trigger);
        }
        return r.trigger === trigger;
    }).map(({ trigger, ...rule }) => rule as RuleItem);
}

async function doValidate(rules: RuleItem[]) {
    const modleName = propString.value;
    const validator = new Schema({ [modleName]: rules });
    return validator
        .validate({ [modleName]: innerVal.value }, { firstFields: true })
        .then(() => {
            validateStatus.value = "success";
            ctx?.emits("validate", props, true, "");
            return true;
        })
        .catch((err: FormValidateFailuer) => {
            const { errors } = err;
            validateStatus.value = "error";
            errMsg.value = errors && size(errors) > 0 ? errors[0].message ?? "" : "";
            ctx?.emits("validate", props, false, errMsg.value);
            return Promise.reject(err);
        });
}

const validate: FormItemInstance["validate"] = async function (
    trigger: string,
    callback?: FormValidateCallback
) {
    if (isResetting || !props.prop || isDisabled.value) return false;

    if (!validateStatus.value) {
        callback?.(false);
        return false;
    }

    const rules = getTriggeredRules(trigger);
    if (!size(rules)) {
        callback?.(true);
        return true;
    }

    validateStatus.value = "validating";

    return doValidate(rules)
        .then(() => {
            callback?.(true);
            return true;
        })
        .catch((err: FormValidateFailuer) => {
            const { fields } = err;
            callback?.(false, fields);
            return Promise.reject(fields);
        });
};

const resetField: FormItemInstance["resetField"] = function () {
    const model = ctx?.model;
    if (model && propString.value && !isNil(get(model, propString.value))) {
        isResetting = true;
        model[propString.value] = cloneDeep(initialVal);
    }
    nextTick(() => clearValidate());
};

const clearValidate: FormItemInstance["clearValidate"] = function () {
    validateStatus.value = "init";
    errMsg.value = "";
    isResetting = false;
};

const addInputId: FormItemContext["addInputId"] = function (id) {
    if (!includes(inputIds.value, id)) inputIds.value.push(id);
};

const removeInputId: FormItemContext["removeInputId"] = function (id) {
    inputIds.value = filter(inputIds.value, (i) => i !== id);
};

const formItemCtx: FormItemContext = reactive({
    ...toRefs(props),
    disabled: isDisabled.value,
    validate,
    resetField,
    clearValidate,
    addInputId,
    removeInputId,
});

onMounted(() => {
    if (!props.prop) return;
    ctx?.addField(formItemCtx);
    initialVal = innerVal.value;
});

onUnmounted(() => {
    if (!props.prop) return;
    ctx?.removeField(formItemCtx);
});

provide<FormItemContext>(FORM_ITEM_CTX_KEY, formItemCtx);

defineExpose<FormItemInstance>({
    validateMessage: errMsg,
    validateStatus,
    validate,
    resetField,
    clearValidate,
});
</script>

<template>
    <div class="ec-form-item" :class="{
        'is-error': validateStatus === 'error',
        'is-disabled': isDisabled,
        'is-required': isRequired,
        'asterisk-left': ctx?.requiredAsteriskPosition === 'left',
        'asterisk-right': ctx?.requiredAsteriskPosition === 'right',
    }">
        <component v-if="hasLabel" class="ec-form-item__label" :class="`position-${ctx?.labelPosition ?? `right`}`"
            :is="labelFor ? 'label' : 'div'" :id="labelId" :for="labelFor">
            <slot name="label" :label="currentLabel">
                {{ currentLabel }}
            </slot>
        </component>
        <div class="ec-form-item__content">
            <slot :validate="validate"></slot>
            <div class="ec-form-item__error-msg" v-if="validateStatus === 'error'">
                <template v-if="ctx?.showMessage && showMessage">
                    <slot name="error" :error="errMsg">{{ errMsg }}</slot>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "./style.css";

.ec-form-item {
    --ec-form-lebel-width: v-bind(normalizeLabelWidth) !important;
}
</style>