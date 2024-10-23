<script setup lang="ts">
import { type IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";
import { computed } from "vue";

defineOptions({
  name: "EcIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();
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
.ec-icon {
    --ec-icon-color: inherit;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    fill: currentColor;
    color: var(--ec-icon-color);
    font-size: inherit;
}
  
@each $val in primary, info, success, warning, danger {
    .ec-icon--$(val) {
        --ec-icon-color: var(--ec-color-$(val));
    }
}
</style>



