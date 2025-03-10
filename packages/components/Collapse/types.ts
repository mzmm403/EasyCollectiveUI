import type { Ref } from "vue";

export type CollapseItemName = string | number;

// Collapse 组件的 props
// modelValue: 面板的标识的数组
// accordion: 是否手风琴模式，即每次只能打开一个面板
export interface CollapseProps {
    modelValue: CollapseItemName[];
    accordion?: boolean;
}

// CollapseItem 组件的 props
// name: 面板的标识
// title: 面板的标题
// disabled: 是否禁用面板
export interface CollapseItemProps {
    name: CollapseItemName;
    title?: string;
    disabled?: boolean;
}

export interface CollapseEmits {
    // update:modelValue: 更新面板的标识的数组
    (e: 'update:modelValue', value: CollapseItemName[]): void;
    // change: 更新面板的标识的数组
    (e: 'change', value: CollapseItemName[]): void;
}

export interface CollapseContext {
    // 哪些折叠面板是激活的
    activeNames: Ref<CollapseItemName[]>;
    hanldeItemClick(name: CollapseItemName): void;
}