<script lang="ts" setup>
import { ref } from "vue";

const disabled = ref(false);
</script>

<template>
    <ec-tooltip :disabled="disabled" content="click to close tooltip function" placement="bottom">
        <ec-button @click="disabled = !disabled">click to {{ disabled ? "active" : "close" }} tooltip
            function</ec-button>
    </ec-tooltip>
</template>