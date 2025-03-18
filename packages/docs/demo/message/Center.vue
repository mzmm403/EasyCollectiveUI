<script lang="ts" setup>
import { EcMessage } from "easy-collective-ui";

const openCenter = () => {
    EcMessage({
        showClose: true,
        message: "Centered text",
        center: true
    });
};
</script>

<template>
    <ec-button plain @click="openCenter">Centered text</ec-button>
</template>