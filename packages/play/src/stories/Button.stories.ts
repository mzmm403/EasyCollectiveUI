import type { Meta,StoryObj,ArgTypes } from "@storybook/vue3"
import {fn,within,userEvent,expect, clearAllMocks} from "@storybook/test"
import { EcButton,EcButtonGroup } from "easy-collective-ui"
import set from "lodash-es/set";


type Story = StoryObj<typeof EcButton> & { argTypes?: ArgTypes }


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
      `<ec-button v-bind="args" data-testid="story-test-btn">{{args.content}}</ec-button>`
    ),
  }),

  play: async ({ canvasElement, args, step}) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByTestId("story-test-btn");

    await step("wehen useThrottle is set to true, the onClick should be called once", async () => {
      set(args,"useThrottle", true)
      await userEvent.tripleClick(btn)

      expect(args.onClick).toHaveBeenCalledOnce()
      clearAllMocks()
    })

    await step("when useThrottle is set to false, the onClick should be called three times",async()=>{
      set(args,"useThrottle", false)
      await userEvent.tripleClick(btn)

      expect(args.onClick).toHaveBeenCalledTimes(3)
      clearAllMocks()
    })

    await step("when disabled is set to true, the onClick should not be called", async()=>{
      set(args,"disabled", true)
      await userEvent.click(btn)

      expect(args.onClick).toHaveBeenCalledTimes(0)
      set(args,"disabled", false)
      clearAllMocks()
    })

    await step("when loading is set to true, the onClick should not be called",async()=>{
      set(args,"loading", true)
      await userEvent.click(btn)

      expect(args.onClick).toHaveBeenCalledTimes(0)
      set(args,"loading", false)
      clearAllMocks()
    })
  }
};

// 自动聚焦
export const Autofocus: Story & { args: {content: string}} = {
  argTypes: {
    content: {
      control: { type: "text" },
    }
  },
  args: {
    content: "Button",
    autofocus: true,
    type: "primary"
  },
  render: (args) => ({
    components: { EcButton },
    setup() {
      return { args };
    },
    template: container(
      `
      <p>请点击浏览器刷新页面按钮来获取按钮聚焦</p>
      <ec-button v-bind="args" data-testid="story-test-btn">{{args.content}}</ec-button>
      `
    )
  }),
  
  play: async ({ args }) => {
    await userEvent.keyboard("{enter}")

    expect(args.onClick).toHaveBeenCalledOnce()
    clearAllMocks() 
  }
}

export const Circle: Story = {
  args: {
    icon: "search",
    type: "primary"
  },
  render: (args) => ({
    components: { EcButton },
    setup() {
      return { args };
    },
    template: container(`
      <ec-button circle v-bind="args"/>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};

Circle.parameters = {};

export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    groupSize: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    groupDisabled: {
      control: "boolean",
    },
    content1: {
      control: { type: "text" },
      defaultValue: "Button1",
    },
    content2: {
      control: { type: "text" },
      defaultValue: "Button2",
    },
  },
  args: {
    round: true,
    type: "primary",
    content1: "Button1",
    content2: "Button2",
  },
  render: (args) => ({
    components: { EcButton, EcButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
       <ec-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <ec-button v-bind="args">{{args.content1}}</ec-button>
         <ec-button v-bind="args">{{args.content2}}</ec-button>
       </ec-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click btn1", async () => {
      await userEvent.click(canvas.getByText("Button1"));
    });
    await step("click btn2", async () => {
      await userEvent.click(canvas.getByText("Button2"));
    });
    expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;