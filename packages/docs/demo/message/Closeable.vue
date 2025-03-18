<script lang="ts" setup>
import { EcMessage } from "easy-collective-ui";

const open1 = () => {
    EcMessage({
        showClose: true,
        message: "This is a message.",
    });
};
const open2 = () => {
    EcMessage({
        showClose: true,
        message: "Congrats, this is a success message.",
        type: "success",
    });
};
const open3 = () => {
    EcMessage({
        showClose: true,
        message: "Warning, this is a warning message.",
        type: "warning",
    });
};
const open4 = () => {
    EcMessage({
        showClose: true,
        message: "Oops, this is a error message.",
        type: "danger",
    });
};
</script>

<template>
    <ec-button :plain="true" @click="open1">Message</ec-button>
    <ec-button :plain="true" @click="open2">Success</ec-button>
    <ec-button :plain="true" @click="open3">Warning</ec-button>
    <ec-button :plain="true" @click="open4">Error</ec-button>
</template>