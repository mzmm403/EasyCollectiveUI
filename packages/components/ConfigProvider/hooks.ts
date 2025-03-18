import {
    ref,
    getCurrentInstance,
    inject,
    computed,
    provide,
    unref,
    watch,
} from "vue";
import type { MaybeRef, Ref, App } from "vue";
import {
    type ConfigProviderContext,
    configProviderContextKey,
} from "./constants";
import { createI18n, i18nSymbol } from "vue3-i18n";
import type { TranslatePair } from "@easy-collective-ui/locale";
import English from "@easy-collective-ui/locale/lang/en";
import { merge } from "lodash-es";
import { debugWarn } from "@easy-collective-ui/utils";

const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig<
    K extends keyof ConfigProviderContext,
    D extends ConfigProviderContext[K],
>(key: K, defaultVal?: D): Ref<Exclude<ConfigProviderContext[K], void>>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(
    key?: keyof ConfigProviderContext,
    defaultVal = void 0
) {
    const config = getCurrentInstance()
        ? inject(configProviderContextKey, globalConfig)
        : globalConfig;

    return key ? computed(() => config.value?.[key] ?? defaultVal) : config;
}

const _createI18n = (opts?: ConfigProviderContext) => {
    const mergeMsg = (msg: TranslatePair) =>
        merge(msg, opts?.extendsI18nMsg ?? {});

    if (!opts?.locale) {
        return createI18n({
            locale: "en",
            messages: mergeMsg({
                en: English.el,
            }),
        });
    }

    return createI18n({
        locale: opts.locale?.name || "en",
        messages: mergeMsg({
            en: English.el,
            [opts.locale?.name]: opts.locale?.el ?? {},
        }),
    });
};

export function provideGlobalConfig(
    config: MaybeRef<ConfigProviderContext> = { locale: English },
    app?: App,
    global = false
) {
    const instance = getCurrentInstance();
    const oldCfg = instance ? useGlobalConfig() : void 0;
    const provideFn = app?.provide ?? (instance ? provide : void 0);

    if (!provideFn) {
        debugWarn(
            "provideGlobalConfig",
            "provideGlobalConfig() can only be used inside setup()"
        );
        return;
    }

    const context = ref(unref(config));
    watch(
        () => config,
        (val) => {
            const cfg = unref(val);
            if (!oldCfg?.value) return cfg;
            context.value = merge(oldCfg.value, cfg);
        },
        { deep: true }
    );

    const i18n = ref(_createI18n(context.value));
    watch(
        () => context.value,
        (val) => (i18n.value = _createI18n(val)),
        { deep: true }
    );

    provideFn(configProviderContextKey, context);
    provideFn(i18nSymbol, i18n);

    if (app) app.use(i18n.value);
    if (global || !globalConfig.value) globalConfig.value = context.value;

    return context;
}