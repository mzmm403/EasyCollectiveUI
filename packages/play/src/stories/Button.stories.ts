import type { Meta,StoryObj,ArgTypes } from "@storybook/vue3"
import {fn,within,userEvent,expect} from "@storybook/test"
import { EcButton } from "easy-collective-ui"


type Story = StoryObj<typeof EcButton> & { argTypes: ArgTypes }


const meta: Meta<typeof EcButton> = {
  title: "Example/Button",
  component: EcButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
  args: { onClick: fn() },
};

const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    type: "primary",
    content: "Button",
    icon: ""
  },
  render: (args) => ({
    components: { EcButton },
    setup() {
      return { args };
    },
    template: container(
      `<ec-button v-bind="args">{{args.content}}</ec-button>`
    ),
  }),

  // 协议写测试用例
  play:async ({canvasElement,args,step}) => {
    const canvas = within(canvasElement);
    await step("Click the button", async () => {
      await userEvent.click(canvas.getByRole("button"));
    })
    expect(args.onClick).toHaveBeenCalled();
  }
}




export default meta;