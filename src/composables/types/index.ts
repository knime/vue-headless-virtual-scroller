import type { CSSProperties, Ref } from "vue";

export interface IndexStartEnd {
  startIndex: number;
  endIndex: number;
  toArray: () => number[];
}

export type Direction = "vertical" | "horizontal";

export interface ComposableReturnType<
  Indices extends Ref<IndexStartEnd> | Record<Direction, Ref<IndexStartEnd>>,
  ScrolledAreaStyles extends
    | Ref<CSSProperties>
    | Record<Direction, Ref<CSSProperties>>,
> {
  containerProps: {
    ref: Ref<null | HTMLElement>;
    onScroll: () => void;
  };
  scrolledAreaStyles: ScrolledAreaStyles;
  indices: Indices;
}
