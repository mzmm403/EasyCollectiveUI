<script lang="ts" setup>
import { EcMessage } from "easy-collective-ui";

const open1 = () => {
    EcMessage("This is a message.");
};
const open2 = () => {
    EcMessage({
        message: "Congrats, this is a success message.",
        type: "success",
    });
};
const open3 = () => {
    EcMessage({
        message: "Warning, this is a warning message.",
        type: "warning",
    });
};
const open4 = () => {
    EcMessage.error("Oops, this is a error message.");
};
</script>

<template>
    <ec-button :plain="true" @click="open2">Success</ec-button>
    <ec-button :plain="true" @click="open3">Warning</ec-button>
    <ec-button :plain="true" @click="open1">Message</ec-button>
    <ec-button :plain="true" @click="open4">Error</ec-button>
</template>