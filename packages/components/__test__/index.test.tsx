import type { Plugin } from "vue";
import { describe, it, expect } from "vitest";
import {
    EcAlert,
    EcButton,
    EcButtonGroup,
    EcCollapse,
    EcCollapseItem,
    EcIcon,
} from "..";
import { get, map } from "lodash-es";

const comps = [
    EcAlert,
    EcButton,
    EcButtonGroup,
    EcCollapse,
    EcCollapseItem,
    EcIcon,
] as Plugin[];

describe("components/index", () => {
    it.each(map(comps, (c) => [get(c, "name") ?? "", c]))(
        "%s should be exported",
        (_, component) => {
            expect(component).toBeDefined();
            expect(component.install).toBeDefined();
        }
    );
});