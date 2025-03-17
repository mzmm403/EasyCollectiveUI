<script setup lang="ts">
import { ref, computed } from "vue";
import { addUnit } from "@easy-collective-ui/utils";
import { useLocale } from "@easy-collective-ui/hooks";
import type { TooltipInstance } from "../Tooltip";
import type { PopconfirmProps, PopconfirmEmits } from "./types";

import EcTooltip from "../Tooltip/Tooltip.vue";
import EcButton from "../Button/Button.vue";
import EcIcon from "../Icon/Icon.vue";

defineOptions({
    name: "ErPopconfirm",
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
    title: "",
    confirmButtonType: "primary",
    icon: "question-circle",
    iconColor: "#f90",
    hideAfter: 200,
    width: 150,
});

const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();
const style = computed(() => ({ width: addUnit(props.width) }));

const locale = useLocale();

function hidePopper() {
    tooltipRef.value?.hide();
}

function confrim(e: MouseEvent) {
    emits("confirm", e);
    hidePopper();
}

function cancel(e: MouseEvent) {
    emits("cancel", e);
    hidePopper();
}
</script>

<template>
    <ec-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
        <template #content>
            <div class="ec-popconfirm" :style="style">
                <div class="ec-popconfirm__main">
                    <ec-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
                    {{ title }}
                </div>
                <div class="ec-popconfirm__action">
                    <ec-button class="ec-popconfirm__cancel" size="small" :type="cancelButtonType" @click="cancel">
                        {{ cancelButtonText || locale.t("popconfirm.cancelButtonText") }}
                    </ec-button>
                    <ec-button class="ec-popconfirm__confirm" size="small" :type="confirmButtonType" @click="confrim">
                        {{ confirmButtonText || locale.t("popconfirm.confirmButtonText") }}
                    </ec-button>
                </div>
            </div>
        </template>

        <template v-if="$slots.default" #default>
            <slot name="default"></slot>
        </template>

        <template v-if="$slots.reference" #default>
            <slot name="reference"></slot>
        </template>
    </ec-tooltip>
</template>

<style scoped>
@import "./style.css";
</style>