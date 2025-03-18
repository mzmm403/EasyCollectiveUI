<script lang="ts" setup>
import { h } from "vue";
import { EcMessage } from "easy-collective-ui";

const open = () => {
    EcMessage("This is a message.");
};

const openVn = () => {
    EcMessage({
        message: h("p", { style: "line-height: 1; font-size: 14px" }, [
            h("span", null, "Message can be "),
            h("i", { style: "color: teal" }, "VNode"),
        ]),
    });
};
</script>

<template>
    <ec-button :plain="true" @click="open">Show message</ec-button>
    <ec-button :plain="true" @click="openVn">VNode</ec-button>
</template>