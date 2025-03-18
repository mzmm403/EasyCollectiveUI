<script setup lang="ts">
import { ja, ko, en, zhCn, zhTw, EcConfigProvider } from "easy-collective-ui";
import { get } from "lodash-es";

import { computed, ref } from "vue";

const language = ref("");
const langMap = {
    ja,
    ko,
    en,
    zhCn,
    zhTw,
} as const;
const locale = computed(() => get(langMap, language.value));
const changelang = () => {
    const l = ["zhCn", "zhTw", "ko", "en", "ja"];
    language.value = l[(l.indexOf(language.value) + 1) % l.length];
};
</script>
<template>
    <ec-button @click="changelang" type="info" style="margin-right: 20px">change language</ec-button>
    <ec-config-provider :locale="locale">
        <ec-popconfirm title="Are you shure to delete this item?">
            <ec-button>Delete</ec-button>
        </ec-popconfirm>
    </ec-config-provider>
</template>