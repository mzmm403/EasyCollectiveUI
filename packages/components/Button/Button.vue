<script setup lang="ts">
import { ref, computed, inject } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { throttle } from "lodash-es";
import { EcIcon } from "../Icon/index";
import { BUTTON_GROUP_CXT_KEY } from "./contants";

// 定义了组件的名称，defineOptions是用来设置组件的一些选项的
defineOptions({
  name: "EcButton",
});

// 定义了组件的props以及给了一些默认值
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  // 是否开启节流
  useThrottle: true,
  throttleDuration: 500,
});

// 定义了组件的emits，也就是事件监听器
const emits = defineEmits<ButtonEmits>();

// 依赖注入了按钮组上下文信息，如果没有则默认为undefined。
const ctx = inject(BUTTON_GROUP_CXT_KEY,void 0)

// 定义了插槽，这样就可以在模板中使用<slot></slot>来插入内容了。
// 当然这里还可以通过 default: () => JSX.Element | string; 这样的方式来定义插槽的默认值
const slots = defineSlots();

// 定义了组件的ref，这样就可以在父组件中通过ref访问到这个按钮元素了。
const _ref = ref<HTMLButtonElement>();

// 定义了各种属性的计算，这样就可以在模板中使用这些属性了。
const size = computed(() => ctx?.size ?? props?.size ?? "");

const type = computed(() => ctx?.type ?? props?.type ?? "");

const disabled = computed(() => ctx?.disabled || props?.disabled || false);

const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));


// 点击事件的监听
const handleBtnClick = (e: MouseEvent) => emits("click", e);
// 节流处理点击事件
const handleBtnClickThrottle = throttle(
  // 点击事件
  handleBtnClick, 
  // 父组件传来的节流时间
  props.throttleDuration,
  // 表示在节流周期结束时，不会再执行最后一次调用，即最后一次事件会被丢弃。
  // 如果是true，表示在节流周期结束时，函数会执行最后一次调用，即最后一个事件会触发。
  { trailing: false }
);

// defineExpose是用来导出组件的实例属性的，这样就可以在父组件中通过ref访问到这些属性了。
defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type
});

</script>

<style scoped>
@import "./style.css";
</style>

<template>
  <component
    ref="_ref"
    class="ec-button"
    :is="tag"
    :autofocus="autofocus"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
            [`ec-button--${type}`]:type,
            [`ec-button--${size}`]:size,
            'is-plain':plain,
            'is-round':round,
            'is-circle':circle,
            'is-disabled':disabled,
            'is-loading':loading,
        }"
    @click="(e:MouseEvent) => useThrottle?handleBtnClickThrottle(e):handleBtnClick(e)"
  >
    <template v-if="loading">
      <slot name="loading">
        <ec-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <ec-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    />
    <slot></slot>
  </component>
</template>