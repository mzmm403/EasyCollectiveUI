import { inject, ref, unref, computed, type Ref } from "vue";
import { omit } from "lodash-es";
import { createI18n, i18nSymbol, type I18nInstance } from "vue3-i18n";
import type { Language } from "@easy-collective-ui/locale";
import English from "@easy-collective-ui/locale/lang/en";

const omitInstall = (obj: I18nInstance) => omit(obj, "install");

export function useLocale(localeOverrides?: Ref<Language>) {
    if (!localeOverrides) {
        const i18n: Ref<I18nInstance> =
            inject(i18nSymbol) ??
            ref(createI18n({ locale: English.name, messages: { en: English.el } }));

        return computed(() => omitInstall(unref(i18n)));
    }

    return computed(() =>
        omitInstall(
            createI18n({
                locale: localeOverrides.value.name,
                messages: {
                    en: English.el,
                    [localeOverrides.value.name]: localeOverrides.value.el,
                },
            })
        )
    );
}

export default useLocale;