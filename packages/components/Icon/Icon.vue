<script setup lang="ts">
import { type IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";
import { computed } from "vue";

defineOptions({
  name: "EcIcon",
  // 关闭组件的继承属性，防止传递到子元素上
  inheritAttrs: false,
});

const props = defineProps<IconProps>();
// 这里的filterProps是在原有props的基础上去除了type和color属性。
// omit的作用就是从对象中移除指定的属性，这里就是移除了type和color。这里是浅拷贝不改变原对象。
const filterProps = computed(() => omit(props, ["type", "color"]));
const customStyles = computed(() => ({ color: props.color ?? void 0 }));
</script>
<template>
  <i
    class="ec-icon"
    :class="{ [`ec-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>
<style scoped>
@import "./style.css";
</style>



