/* eslint-disable no-magic-numbers */
import type { Meta, StoryObj } from "@storybook/vue3";

import {
  constructSizeManager,
  getArgTypes,
  SizeManagerArgs,
} from "./sizeManagerControl";
import { h } from "vue";
import DemoLine from "../components/DemoLine.vue";
import { defaultItemSize, defaultItemSizes, defaultNumItems } from "./defaults";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Virtual Line",
  render: (
    args: SizeManagerArgs & { direction: "horizontal" | "vertical" },
  ) => {
    const sizeManager = constructSizeManager("")(args);
    return h(DemoLine, { sizeManager, direction: args.direction });
  },
  argTypes: {
    direction: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
    ...getArgTypes(),
  },
  args: {},
} satisfies Meta<SizeManagerArgs & { direction: "horizontal" | "vertical" }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SameSize: Story = {
  args: {
    direction: "vertical",
    SizeManager: "SameSizeManager",
    NumItems: defaultNumItems,
    ItemSize: defaultItemSize,
  },
};

export const ArrayOfSizes: Story = {
  args: {
    direction: "vertical",
    SizeManager: "ArraySizeManager",
    ItemSizes: defaultItemSizes,
  },
};
export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    SizeManager: "SameSizeManager",
    NumItems: defaultNumItems,
    ItemSize: defaultItemSize,
  },
};
