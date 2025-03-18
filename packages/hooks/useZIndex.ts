import { computed, ref } from "vue";

const zIndex = ref(0);

export default function useZIndex(initVal = 2000) {
    const _initVal = ref(initVal);
    const currentZIndex = computed(() => zIndex.value + _initVal.value);

    const nextZIndex = () => {
        zIndex.value++;
        return currentZIndex.value;
    };

    return {
        initialValue: _initVal,
        currentZIndex,
        nextZIndex,
    };
}