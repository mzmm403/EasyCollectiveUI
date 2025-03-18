<script setup lang="ts">
import { ref } from 'vue'
const input3 = ref('')
const input4 = ref('')
</script>

<template>
    <div class="container">
        <div class="myinput">
            <ec-input v-model="input3" placeholder="Pick a date">
                <template #suffix>
                    <ec-icon icon="calendar"></ec-icon>
                </template>
            </ec-input>
        </div>
        <div class="myinput">
            <ec-input class="myinput" v-model="input4" placeholder="Type something">
                <template #prefix>
                    <ec-icon icon="search"></ec-icon>
                </template>
            </ec-input>
        </div>
    </div>
</template>


<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.myinput {
    width: 380px;
}
</style>
