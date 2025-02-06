import { type CSSProperties, type Ref, ref } from "vue";
import { useResizeObserver } from "@vueuse/core";

import type { ComposableReturnType, Direction, IndexStartEnd } from "./types";
import useVirtualLine from "./useVirtualLine";

type LineProps = Parameters<typeof useVirtualLine>[0];

export default (props: {
  rows: LineProps;
  columns: LineProps;
}): ComposableReturnType<
  Record<Direction, Ref<IndexStartEnd>>,
  Record<Direction, Ref<CSSProperties>>
> => {
  const container: Ref<HTMLElement | null> = ref(null);

  const rows = useVirtualLine(props.rows, "vertical", container);
  const columns = useVirtualLine(props.columns, "horizontal", container);

  const onScroll = () => {
    rows.containerProps.onScroll();
    columns.containerProps.onScroll();
  };

  useResizeObserver(container, onScroll);

  const containerProps = {
    ref: container,
    onScroll,
  };

  return {
    containerProps,
    scrolledAreaStyles: {
      vertical: rows.scrolledAreaStyles,
      horizontal: columns.scrolledAreaStyles,
    },
    indices: {
      vertical: rows.indices,
      horizontal: columns.indices,
    },
  };
};
