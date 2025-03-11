<script setup>
function handleBtnClick() {
    console.log("btn click");
}
</script>

<template>
    <p>
        <ec-button @click="handleBtnClick"> with throttle</ec-button>
        <ec-button :use-throttle="false" @click="handleBtnClick">without throttle</ec-button>
    </p>
</template>