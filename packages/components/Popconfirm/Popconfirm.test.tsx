import { describe, it, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { each, get } from "lodash-es";
import { EcPopconfirm } from ".";
import { withInstall } from "@easy-collective-ui/utils";
import type { PopconfirmProps } from "./types";

import PopConfirm from "./Popconfirm.vue";


const onConfirm = vi.fn();
const onCancel = vi.fn();

describe("Popconfirm/index.ts", () => {
    // 测试 withInstall 函数是否被正确应用
    it("should be exported with withInstall()", () => {
        expect(EcPopconfirm.install).toBeDefined();
    });

    // 测试 Popconfirm 组件是否被正确导出
    it("should be exported Popconfirm component", () => {
        expect(EcPopconfirm).toBe(PopConfirm);
    });

    // 可选：测试 withInstall 是否增强了 Popconfirm 组件的功能
    test("should enhance Popconfirm component", () => {
        const enhancedPopconfirm = withInstall(PopConfirm);
        expect(enhancedPopconfirm).toBe(EcPopconfirm);
        // 这里可以添加更多测试，确保 withInstall 增强了组件的特定功能
    });

    // 可选：如果你的 withInstall 函数有特定的行为或属性，确保它们被正确应用
    test("should apply specific enhancements", () => {
        const enhancedPopconfirm = withInstall(PopConfirm);
        // 例如，如果你的 withInstall 增加了一个特定的方法或属性
        expect(enhancedPopconfirm).toHaveProperty("install");
    });
});

describe("Popconfirm.vue", () => {
    const props = {
        title: "Test Title",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        confirmButtonType: "primary",
        cancelButtonType: "info",
        icon: "check-circle",
        iconColor: "green",
        hideIcon: false,
        hideAfter: 500,
        width: 200,
    } as PopconfirmProps;

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
    });

    it("should accept all props", () => {
        const wrapper = mount(PopConfirm, {
            props,
        });

        each(props, (value, key) => {
            expect(get(wrapper.props(), key)).toBe(value);
        });
    });

    it("should render slot content correctly", () => {
        const slotContent = "Slot Content";
        const wrapper = mount(PopConfirm, {
            props,
            slots: {
                default: slotContent,
            },
        });

        expect(wrapper.text()).toContain(slotContent);
    });

    test("popconfirm emits", async () => {
        const wrapper = mount(() => (
            <div>
                <div id="outside"></div>
                <PopConfirm
                    title="Test Title"
                    hideIcon={true}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                >
                    <button id="trigger">trigger</button>
                </PopConfirm>
            </div>
        ));

        const triggerNode = wrapper.find("#trigger");
        expect(triggerNode.exists()).toBeTruthy();

        triggerNode.trigger("click");
        await vi.runAllTimers();

        expect(wrapper.find(".ec-popconfirm").exists()).toBeTruthy();
        const confirmBtn = wrapper.find(".ec-popconfirm__confirm");
        expect(confirmBtn.exists()).toBeTruthy()

        confirmBtn.trigger("click");
        await vi.runAllTimers();
        expect(wrapper.find(".ec-popconfirm").exists()).toBeFalsy();
        expect(onConfirm).toBeCalled()

        triggerNode.trigger("click");
        await vi.runAllTimers();
        expect(wrapper.find(".ec-popconfirm").exists()).toBeTruthy();

        const cancelBtn = wrapper.find(".ec-popconfirm__cancel");
        expect(cancelBtn.exists()).toBeTruthy()

        cancelBtn.trigger("click");
        await vi.runAllTimers();
        expect(wrapper.find(".ec-popconfirm").exists()).toBeFalsy();
        expect(onCancel).toBeCalled()
    });
});