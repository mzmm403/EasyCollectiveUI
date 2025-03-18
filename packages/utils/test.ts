import { nextTick } from "vue";

export const rAF = async () => {
    return new Promise((res) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(async () => {
                res(null);
                await nextTick();
            });
        });
    });
};