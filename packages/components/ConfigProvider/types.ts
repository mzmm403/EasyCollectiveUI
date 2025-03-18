import type { Language, TranslatePair } from "@easy-collective-ui/locale";

export interface ConfigProviderProps {
    locale?: Language;
    extendsI18nMsg?: TranslatePair;
}