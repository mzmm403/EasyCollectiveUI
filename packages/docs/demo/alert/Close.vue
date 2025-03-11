<script setup>
// import { EcMessage } from "easy-collective-ui";

// function handleClose() {
//     EcMessage.info("close callback");
// }
</script>
<template>
    <div class="basic block">
        <ec-alert title="Unclosable alert" type="success" :closable="false" />
        <ec-alert title="Alert with callback" type="warning" :closable="true"/>
    </div>
</template>