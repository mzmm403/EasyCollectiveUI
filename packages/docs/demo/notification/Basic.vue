<script setup lang="ts">
import { h } from "vue";
import { EcNotification } from "easy-collective-ui";

function openNotify1() {
    EcNotification({
        title: "Title",
        message: h("i", { style: "color:teal" }, "This is a remider"),
        position: 'bottom-right'
    });
}

function openNotify2() {
    EcNotification({
        title: "Prompt",
        message: "This is a message that does not auto close",
        duration: 0,
        position: 'top-left'
    });
}
</script>

<template>
    <ec-button @click="openNotify1" plain>Closes automatically</ec-button>
    <ec-button @click="openNotify2" plain>Won't closes automatically</ec-button>
</template>