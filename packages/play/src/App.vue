<script lang="ts" setup>
import { EcMessage } from "easy-collective-ui"

const open1 = () => {
  EcMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open2 = () => {
  EcMessage.success("Congrats, this is a success message.");
};
</script>
<template>
  <div>
    <ec-button @click="open1">插件式调用</ec-button>
    <ec-button @click="open2">函数式调用</ec-button>
    <ec-button @click="$message.success('Congrats, this is a success message.')"
      >全局方法调用</ec-button
    >
  </div>
</template>