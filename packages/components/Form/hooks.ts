import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constants";
import {
    computed,
    inject,
    onMounted,
    onUnmounted,
    ref,
    toRef,
    unref,
    watch,
    type MaybeRef,
    type WatchStopHandle,
} from "vue";
import { useId, useProp } from "@easy-collective-ui/hooks";
import type { FormItemContext } from "./types";
export function useFormItem() {
    const form = inject(FORM_CTX_KEY, void 0);
    const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
    return { form, formItem };
}

export function useFormDisabled(fallback?: MaybeRef<boolean | void>) {
    const disabled = useProp<boolean>("disabled");
    const form = inject(FORM_CTX_KEY, void 0);
    const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
    return computed(
        () =>
            disabled.value ||
            unref(fallback) ||
            form?.disabled ||
            formItem?.disabled ||
            false
    );
}

interface UseFormItemInputCommenProps extends Record<string, any> {
    id?: string;
}

export function useFormItemInputId(
    props: UseFormItemInputCommenProps,
    formItemContext?: FormItemContext
) {
    const inputId = ref<string>("");
    let unwatch: WatchStopHandle | void;

    onMounted(() => {
        unwatch = watch(
            toRef(() => props.id),
            (id) => {
                const newId = id ?? useId().value;
                if (newId !== inputId.value) {
                    inputId.value && formItemContext?.removeInputId(inputId.value);
                    formItemContext?.addInputId(newId);
                    inputId.value = newId;
                }
            },
            {
                immediate: true,
            }
        );
    });

    onUnmounted(() => {
        unwatch && unwatch();
        inputId.value && formItemContext?.removeInputId(inputId.value);
    });

    return {
        inputId,
    };
}