<script setup lang="ts">
import type { ConfigProviderProps } from "./types";
import { provideGlobalConfig } from "./hooks";

defineOptions({
    name: "EcConfigProvider",
});
const props = defineProps<ConfigProviderProps>();
const config = provideGlobalConfig(props);
</script>

<template>
    <slot name="default" :config="config"></slot>
</template>