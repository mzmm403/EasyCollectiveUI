import type { Meta, StoryObj } from "@storybook/vue3";
import { EcCollapse, EcCollapseItem } from "easy-collective-ui";
import "easy-collective-ui/dist/theme/Collapse.css"

type Story = StoryObj<typeof EcCollapse>;

const meta: Meta<typeof EcCollapse> = {
    title: "Example/Collapse",
    component: EcCollapse,
    subcomponents: { EcCollapseItem },
    tags: ["autodocs"],
};

export const Default: Story = {
    render: (args) => ({
        components: {
            EcCollapse,
            EcCollapseItem,
        },
        setup() {
            return {
                args,
            };
        },
        template: `
    <ec-collapse v-bind="args">
      <ec-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </ec-collapse-item>
      <ec-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </ec-collapse-item>
      <ec-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </ec-collapse-item>
    </ec-collapse>
    `,
    }),
    args: {
        accordion: true,
        modelValue: ["a"],
    },
};

export default meta;