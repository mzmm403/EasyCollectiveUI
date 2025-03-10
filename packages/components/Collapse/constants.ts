import type { InjectionKey } from "vue";
import type { CollapseContext } from "./types";

export const COLLAPSE_CONTEXT: InjectionKey<CollapseContext> =
    Symbol("COLLAPSE_CONTEXT");