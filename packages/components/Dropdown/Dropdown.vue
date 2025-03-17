<script setup lang="ts">
import { computed, ref, provide } from "vue";
import { omit, isNil } from "lodash-es";
import { type ButtonInstance, EcButton, EcButtonGroup } from "../Button/index";
import type { TooltipInstance } from "../Tooltip/types";
import type {
    DropdownProps,
    DropdownItemProps,
    DropdownEmits,
    DropdownInstance,
    DropdownContext,
} from "./types";
import { useDisabledStyle } from "@easy-collective-ui/hooks";

import { DROPDOWN_CTX_KEY } from "./contants";

import DropdownItem from "./DropdownItem.vue";
import EcTooltip from "../Tooltip/Tooltip.vue";

defineOptions({
    name: "EcDropdown",
    inheritAttrs: false,
});
const props = withDefaults(defineProps<DropdownProps>(), {
    hideOnClick: true,
    items: () => [] as DropdownItemProps[],
});
const emits = defineEmits<DropdownEmits>();
const slots = defineSlots();

const tooltipRef = ref<TooltipInstance>();
const triggerRef = ref<ButtonInstance>();

const tooltipProps = computed(() =>
    omit(props, ["items", "hideAfterClick", "size", "type", "splitButton"])
);

function handleItemClick(e: DropdownItemProps) {
    props.hideOnClick && tooltipRef.value?.hide();
    !isNil(e.command) && emits("command", e.command);
}

!TEST && useDisabledStyle();
provide<DropdownContext>(DROPDOWN_CTX_KEY, {
    handleItemClick,
    size: computed(() => props.size),
});

defineExpose<DropdownInstance>({
    open: () => tooltipRef.value?.show(),
    close: () => tooltipRef.value?.hide(),
});
</script>

<template>
    <div class="ec-dropdown" :class="{ 'is-disabled': props.disabled }">
        <ec-tooltip ref="tooltipRef" v-bind="tooltipProps" :virtual-triggering="splitButton"
            :virtual-ref="triggerRef?.ref.value" @visible-change="$emit('visible-change', $event)">
            <ec-button-group v-if="splitButton" :type="type" :size="size" :disabled="disabled">
                <ec-button @click="$emit('click', $event)">
                    <slot name="default"></slot>
                </ec-button>
                <ec-button ref="triggerRef" icon="angle-down" />
            </ec-button-group>
            <slot name="default" v-else></slot>

            <template #content>
                <div class="ec-dropdown__menu">
                    <slot name="dropdown">
                        <template v-for="item in items" :key="item.command">
                            <dropdown-item v-bind="item" />
                        </template>
                    </slot>
                </div>
            </template>
        </ec-tooltip>
    </div>
</template>

<style scoped>
@import "./style.css";

:deep(.ec-button-group) {
    &> :last-child {
        padding: 5px 7px;
    }
}
</style>