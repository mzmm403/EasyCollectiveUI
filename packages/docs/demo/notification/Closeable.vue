<script lang="ts" setup>
import { EcNotification } from 'easy-collective-ui'

const open = () => {
    EcNotification.success({
        title: 'Info',
        message: 'This is a message without close button',
        showClose: false,
    })
}
</script>

<template>
    <ec-button plain @click="open"> Hide close button </ec-button>
</template>