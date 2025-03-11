<script setup lang="ts">
import type { AlertEmits,AlertProps,AlertInstance } from './types';
import { typeIconMap } from '@easy-collective-ui/utils';
import { computed, ref } from 'vue'
import EcIcon from '../Icon/Icon.vue';

defineOptions({
    name: "EcAlert",
})

const props = withDefaults(defineProps<AlertProps>(),{
    effect: "light",
    type: "info",
    closable: true,
})

const emit = defineEmits<AlertEmits>()
const slots = defineSlots()

const visible = ref(true)

const iconName = computed(()=>typeIconMap.get(props.type)?? "circle-info")
const withDescription = computed(()=>props.description || slots.default)



function close(){
    visible.value = false
    emit('close')
}

function open(){
    visible.value = true
}

defineExpose<AlertInstance>({
    open,
    close
})
</script>

<template>
    <transition name="ec-alert-fade">
        <div v-show="visible" class="ec-alert" role="alert" :class="{
            [`ec-alert__${type}`]: type,
            [`ec-alert__${effect}`]: effect,
            'text-center': center,
        }">
            <ec-icon v-if="showIcon" class="ec-alert__icon" :class="{ 'big-icon': withDescription }" :icon="iconName" />
            <div class="ec-alert__content">
                <span class="ec-alert__title" :class="{ 'with-desc': withDescription }"
                    :style="{ display: center && !showIcon ? 'flow' : 'inline' }">
                    <slot name="title">{{ title }}</slot>
                </span>
                <p class="ec-alert__description">
                    <slot>{{ description }}</slot>
                </p>
                <div class="ec-alert__close" v-if="closable">
                    <ec-icon @click.stop="close" icon="xmark" />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
@import "./style.css"
</style>