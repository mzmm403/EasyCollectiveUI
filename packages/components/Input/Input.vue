<script setup lang="ts">
import { ref, computed, watch, useAttrs, shallowRef, nextTick } from "vue";
import { useFocusController } from "@easy-collective-ui/hooks";
import { useFormItem, useFormDisabled, useFormItemInputId } from "../Form";
import { each, noop } from "lodash-es";
import type { InputProps, InputEmits, InputInstance } from "./types";

import Icon from "../Icon/Icon.vue";
import { debugWarn } from "@easy-collective-ui/utils";

defineOptions({
    name: "EcInput",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<InputProps>(), {
    type: "text",
    autocomplete: "off",
});

const emits = defineEmits<InputEmits>();

const innerValue = ref(props.modelValue);
const pwdVisible = ref(false);

const inputRef = shallowRef<HTMLInputElement>();
const textareaRef = shallowRef<HTMLTextAreaElement>();

const attrs = useAttrs();
const _ref = computed(() => inputRef.value || textareaRef.value);

const isDisabled = useFormDisabled();
const { formItem } = useFormItem();

const { inputId } = useFormItemInputId(props, formItem);

const showClear = computed(
    () =>
        props.clearable &&
        !!innerValue.value &&
        !isDisabled.value &&
        isFocused.value
);

const showPwdArea = computed(
    () =>
        props.type === "password" &&
        props.showPassword &&
        !isDisabled.value &&
        !!innerValue.value
);

const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
    _ref,
    {
        afterBlur() {
            // form 校验
            formItem?.validate("blur").catch((err) => debugWarn(err));
        },
    }
);

const clear: InputInstance["clear"] = function () {
    innerValue.value = "";
    each(["input", "change", "update:modelValue"], (e) => emits(e as any, ""));
    emits("clear");
    // 清空表单校验
    formItem?.clearValidate();
};
const focus: InputInstance["focus"] = async function () {
    await nextTick();
    _ref.value?.focus();
};

const blur: InputInstance["blur"] = function () {
    _ref.value?.blur();
};

const select: InputInstance["select"] = function () {
    _ref.value?.select();
};

function handleInput() {
    emits("update:modelValue", innerValue.value);
    emits("input", innerValue.value);
}

function handleChange() {
    emits("change", innerValue.value);
}

function togglePwdVisible() {
    pwdVisible.value = !pwdVisible.value;
}

watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal;
        // 表单校验出发
        formItem?.validate("change").catch((err) => debugWarn(err));
    }
);

defineExpose<InputInstance>({
    ref: _ref,
    focus,
    blur,
    select,
    clear,
});
</script>

<template>
    <div class="ec-input" :class="{
        [`ec-input--${type}`]: type,
        [`ec-input--${size}`]: size,
        'is-disabled': isDisabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocused,
    }">
        <template v-if="type !== 'textarea'">
            <div v-if="$slots.prepend" class="ec-input__prepend">
                <slot name="prepend"></slot>
            </div>
            <div class="ec-input__wrapper" ref="wrapperRef">
                <span v-if="$slots.prefix" class="ec-input__prefix">
                    <slot name="prefix"></slot>
                </span>
                <input class="ec-input__inner" ref="inputRef" :id="inputId"
                    :type="showPassword ? (pwdVisible ? 'text' : 'password') : type" :disabled="isDisabled"
                    :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus"
                    :form="form" v-model="innerValue" v-bind="attrs" @input="handleInput" @change="handleChange"
                    @focus="handleFocus" @blur="handleBlur" />
                <span v-if="$slots.suffix || showClear || showPwdArea" class="ec-input__suffix">
                    <slot name="suffix"></slot>
                    <Icon icon="circle-xmark" v-if="showClear" class="ec-input__clear" @click="clear"
                        @mousedown.prevent="noop" />
                    <Icon icon="eye" class="ec-input__password" v-if="showPwdArea && pwdVisible"
                        @click="togglePwdVisible" />
                    <Icon icon="eye-slash" class="ec-input__password" v-if="showPwdArea && !pwdVisible"
                        @click="togglePwdVisible" />
                </span>
            </div>
            <div v-if="$slots.append" class="ec-input__append">
                <slot name="append"></slot>
            </div>
        </template>
        <template v-else>
            <textarea class="ec-textarea__wrapper" ref="textareaRef" :id="inputId" :disabled="isDisabled"
                :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus"
                :form="form" v-model="innerValue" v-bind="attrs" @input="handleInput" @change="handleChange"
                @focus="handleFocus" @blur="handleBlur"></textarea>
        </template>
    </div>
</template>

<style>
@import "./style.css";
</style>