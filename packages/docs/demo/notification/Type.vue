<script lang="ts" setup>
import { EcNotification } from "easy-collective-ui";

const open1 = () => {
    EcNotification({
        title: "Success",
        message: "This is a success message",
        type: "success",
    });
};

const open2 = () => {
    EcNotification({
        title: "Warning",
        message: "This is a warning message",
        type: "warning",
    });
};

const open3 = () => {
    EcNotification({
        title: "Info",
        message: "This is an info message",
        type: "info",
    });
};

const open4 = () => {
    EcNotification({
        title: "Error",
        message: "This is an error message",
        type: "danger",
    });
};
</script>

<template>
    <ec-button plain @click="open1"> Success </ec-button>
    <ec-button plain @click="open2"> Warning </ec-button>
    <ec-button plain @click="open3"> Info </ec-button>
    <ec-button plain @click="open4"> Error </ec-button>
</template>