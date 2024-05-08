import rafThrottle from "raf-throttle";
import { computed, ref, type CSSProperties, type Ref } from "vue";
import type { ComposableReturnType, Direction, IndexStartEnd } from "./types";
import type { SizeManager } from "@/sizeManagers/SizeManager";
import { useResizeObserver } from "@vueuse/core";

const defaultBufferSize = 500;
export default (
  {
    sizeManager,
    buffer = defaultBufferSize,
  }: { sizeManager: SizeManager; buffer?: number },
  direction: Direction = "vertical",
  containerProp: Ref<HTMLElement | null> | null = null,
): ComposableReturnType<Ref<IndexStartEnd>, Ref<CSSProperties>> => {
  const initialScroll = { scrollStart: 0, scrollEnd: 0 };
  const scroll: Ref<{ scrollStart: number; scrollEnd: number }> =
    ref(initialScroll);

  const isVertical = direction === "vertical";
  const container = containerProp ?? ref(null);

  const onScroll = rafThrottle(() => {
    if (!container.value) {
      return;
    }
    const { scrollTop, scrollLeft, offsetHeight, offsetWidth } =
      container.value;
    const scrollStart = isVertical ? scrollTop : scrollLeft;
    const offsetSize = isVertical ? offsetHeight : offsetWidth;
    scroll.value = { scrollStart, scrollEnd: scrollStart + offsetSize };
  });

  sizeManager.onUpdate(onScroll);

  if (!containerProp) {
    useResizeObserver(container, onScroll);
  }

  const indices = computed(() => {
    const startIndex = sizeManager.toIndex(scroll.value.scrollStart - buffer);
    const endIndex = Math.min(
      sizeManager.toIndex(scroll.value.scrollEnd + buffer) + 1,
      sizeManager.getNumItems(),
    );
    const toArray = () =>
      Array.from({ length: endIndex - startIndex }, (_v, i) => startIndex + i);
    return { startIndex, endIndex, toArray };
  });
  const offset = computed(() => sizeManager.toOffset(indices.value.startIndex));
  const scrolledAreaStyles = computed(() => ({
    [`padding${isVertical ? "Top" : "Left"}`]: `${offset.value}px`,
    [isVertical ? "height" : "width"]: `${sizeManager.getTotalSize()}px`,
  }));

  return {
    containerProps: {
      ref: container,
      onScroll,
    },
    indices,
    scrolledAreaStyles,
  };
};
