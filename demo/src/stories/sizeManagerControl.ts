import { ArgTypes } from "@storybook/vue3";
import {
  constructArraySizeManager,
  constructSameSizeManager,
} from "./constructSizeManagerWithSizes";

type HorV = "horizontal" | "vertical" | "";
type Prefixed<T extends HorV, Name extends string> = `${T}${Name}`;
const addHorVPrefix =
  <T extends HorV>(prefix: T) =>
  <Name extends string>(name: Name) =>
    `${prefix}${name}` as Prefixed<T, Name>;

export const getArgTypes = (prefix: HorV = ""): ArgTypes => {
  const addPrefix = prefix ? addHorVPrefix(prefix) : (name: string) => name;
  const sizeManagerType = addPrefix("SizeManager");
  const isSameSizeManager = { arg: sizeManagerType, eq: "SameSizeManager" };
  const isArraySizeManager = { arg: sizeManagerType, eq: "ArraySizeManager" };
  return {
    [sizeManagerType]: {
      name: "Choose a size manager",
      options: ["SameSizeManager", "ArraySizeManager"],
      control: { type: "radio" },
      table: {
        category: prefix,
      },
    },
    [addPrefix("NumItems")]: {
      name: "Number of items",
      control: { type: "number" },
      if: isSameSizeManager,
      table: {
        category: prefix,
      },
    },
    [addPrefix("ItemSize")]: {
      name: "Item size",
      control: { type: "number" },
      if: isSameSizeManager,
      table: {
        category: prefix,
      },
    },
    [addPrefix("ItemSizes")]: {
      name: "Array of all item sizes",
      control: { type: "object" },
      if: isArraySizeManager,
      table: {
        category: prefix,
      },
    },
  };
};

export type SizeManagerArgs<T extends HorV = ""> = Partial<
  {
    [K in Prefixed<T, "SizeManager">]: "SameSizeManager" | "ArraySizeManager";
  } & {
    [K in Prefixed<T, "NumItems">]: number;
  } & {
    [K in Prefixed<T, "ItemSize">]: number;
  } & {
    [K in Prefixed<T, "ItemSizes">]: number[];
  }
>;

export type HorizontalSizeManagerArgs = SizeManagerArgs<"horizontal">;
export type VerticalSizeManagerArgs = SizeManagerArgs<"vertical">;

export const constructSizeManager =
  <T extends HorV>(t: T) =>
  (args: SizeManagerArgs<T>) => {
    const addPrefix = addHorVPrefix(t);
    const {
      [addPrefix("SizeManager")]: sizeManager,
      [addPrefix("NumItems")]: numItems,
      [addPrefix("ItemSize")]: itemSize,
      [addPrefix("ItemSizes")]: itemSizes,
    } = args;
    if (sizeManager === "SameSizeManager") {
      if (!numItems || !itemSize) {
        throw new Error(
          `Expected numItems and itemSize to be defined for SameSizeManager, got: ${numItems}, ${itemSize}`,
        );
      }
      return constructSameSizeManager({ numItems, size: itemSize });
    }
    if (sizeManager === "ArraySizeManager") {
      if (!itemSizes) {
        throw new Error(
          `Expected itemSizes to be defined for ArraySizeManager, got: ${itemSizes}`,
        );
      }
      return constructArraySizeManager({ sizes: itemSizes });
    } else {
      throw new Error(`Unknown size manager type: ${sizeManager}`);
    }
  };
