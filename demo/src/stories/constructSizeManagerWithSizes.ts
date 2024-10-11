import {
  ArraySizeManager,
  SameSizeManager,
  SizeManager,
} from "@knime/vue-headless-virtual-scroller";
export type SizeManagerWithSizes = {
  sizeManager: SizeManager;
  sizes: (index: number) => number;
};
type SameSizeManagerParams = {
  numItems: number;
  size: number;
};
export const constructSameSizeManager = ({
  numItems,
  size,
}: SameSizeManagerParams): SizeManagerWithSizes => {
  return {
    sizeManager: new SameSizeManager(numItems, size),
    sizes: () => size,
  };
};
type ArraySizeManagerParams = { sizes: number[] };
export const constructArraySizeManager = ({
  sizes,
}: ArraySizeManagerParams): SizeManagerWithSizes => {
  return {
    sizeManager: new ArraySizeManager(sizes),
    sizes: (index) => sizes[index],
  };
};
