<script setup lang="ts">
import type { CollapseProps,CollapseEmits, CollapseItemName } from './types';
import { ref, provide, watch, watchEffect } from 'vue'
import { debugWarn } from '@easy-collective-ui/utils';
import { COLLAPSE_CONTEXT } from './constants';

const COMP_NAME = 'EcCollapse' as const;

defineOptions({
    name: COMP_NAME
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref(props.modelValue)



function handleItemClick(item: CollapseItemName) {
    let _activeNames = [...activeNames.value]

    // 手风琴模式
    if(props.accordion){
        _activeNames = [_activeNames[0] === item ? '' : item]
        upadteActiveNames(_activeNames)
        return
    }

    // 正常模式
    const index = _activeNames.indexOf(item)
    if(index > -1) {
        // 移除当前激活的面板
        _activeNames.splice(index, 1)
    }else {
        // 添加激活面板
        _activeNames.push(item)
    }

    upadteActiveNames(_activeNames)
}   

function upadteActiveNames(newNames: CollapseItemName[]) {
    activeNames.value = newNames;
    emits('update:modelValue', newNames);
    emits('change', newNames)
}

provide(COLLAPSE_CONTEXT, {
    activeNames,
    hanldeItemClick: handleItemClick,
})

watchEffect(() => {
    if(props.accordion && activeNames.value.length > 1) {
        debugWarn(COMP_NAME,'accordion mode should only have one active item')
    }
})

watch(
    () => props.modelValue,
    (newNames) => upadteActiveNames(newNames)
)


</script>

<template>
    <div class="ec-collapse">
        <slot></slot>
    </div>
</template>

<style scoped>
@import './style.css'
</style>