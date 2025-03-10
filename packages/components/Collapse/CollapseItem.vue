<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { inject, computed } from 'vue';
import { COLLAPSE_CONTEXT } from './constants';
import EcIcon from '../Icon/Icon.vue';
import transitionEvents from './transitionEvents';

defineOptions({
    name: "EcCollapseItem"
})

const props = defineProps<CollapseItemProps>()
const ctx = inject(COLLAPSE_CONTEXT, void 0)
const isActive = computed(() => ctx?.activeNames.value?.includes(props.name))

function handleClick(){
    if(props.disabled) return
    ctx?.hanldeItemClick(props.name)
}
</script>

<template>
    <div class="ec-collapse-item" :class="{
        'is-disabled': disabled,
    }">
        <div class="ec-collapse-item__header" :id="`item-header-${name}`" :class="{
            'is-disabled': disabled,
            'is-active': isActive,
        }" @click="handleClick">
            <span class="ec-collapse-item__title">
                <slot name="title">
                    {{ title }}
                </slot>
            </span>
            <ec-icon icon="angle-right" class="header-angle" />
        </div>
        <transition name="slide" v-on="transitionEvents">
            <div class="ec-collapse-item__wapper" v-show="isActive">
                <div class="ec-collapse-item__content" :id="`item-content-${name}`">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
@import './style.css'
</style>