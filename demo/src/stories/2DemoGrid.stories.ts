import type { Meta, StoryObj } from "@storybook/vue3";

import DemoGrid from "../components/DemoGrid.vue";
import {
  constructSizeManager,
  getArgTypes,
  HorizontalSizeManagerArgs,
  VerticalSizeManagerArgs,
} from "./sizeManagerControl";
import { h } from "vue";
import { defaultItemSize, defaultItemSizes, defaultNumItems } from "./defaults";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Virtual Grid",
  render: (args: HorizontalSizeManagerArgs & VerticalSizeManagerArgs) => {
    const columnSizeManager = constructSizeManager("horizontal")(args);
    const rowSizeManager = constructSizeManager("vertical")(args);
    return h(DemoGrid, { rowSizeManager, columnSizeManager });
  },
  argTypes: {
    ...getArgTypes("horizontal"),
    ...getArgTypes("vertical"),
  },
  args: {},
} satisfies Meta<HorizontalSizeManagerArgs & VerticalSizeManagerArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SameRowsDifferingColumns: Story = {
  args: {
    horizontalSizeManager: "ArraySizeManager",
    horizontalItemSizes: defaultItemSizes,
    verticalNumItems: defaultNumItems,
    verticalSizeManager: "SameSizeManager",
    verticalItemSize: defaultItemSize,
  },
};
