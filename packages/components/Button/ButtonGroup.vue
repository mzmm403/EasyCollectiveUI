<script setup lang="ts">
import type { ButtonGroupProps } from  "./types"
import { provide, reactive, toRef } from 'vue'
import { BUTTON_GROUP_CXT_KEY } from "./contants";

defineOptions({
    name: "EcButtonGroup"
})

const props = defineProps<ButtonGroupProps>()

provide(
    BUTTON_GROUP_CXT_KEY,
    reactive({
        size: toRef(props, "size"),
        type: toRef(props, "type"),
        disabled: toRef(props, "disabled")
    })
)
</script>

<template>
    <div class="ec-button-group">
        <slot></slot>
    </div>
</template>

<style scoped>
@import "./style";
</style>