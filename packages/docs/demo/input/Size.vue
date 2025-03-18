<script lang="ts" setup>
import { ref } from 'vue'
const input1 = ref('')
const input2 = ref('')
</script>


<template>
    <div class="myInput">
        <p>large:</p>
        <ec-input v-model="input1" size="large" placeholder="Please input" />
    </div>
    <div class="myInput">
        <p>default:</p>
        <ec-input v-model="input1" placeholder="Please input" />
    </div>
    <div class="myInput">
        <p>small:</p>
        <ec-input v-model="input2" size="small" placeholder="Please input" />
    </div>
</template>

<style scoped>
.myInput {
    margin-top: 10px;
}
</style>