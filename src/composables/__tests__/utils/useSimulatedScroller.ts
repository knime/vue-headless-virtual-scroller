import { type Ref, computed, ref, watch } from "vue";

import type { Direction } from "@/composables/types";

const useNumber = () => {
  const num = ref(0);
  const setNum = (newNum: number) => {
    num.value = newNum;
  };
  return { num, setNum };
};

const useOffsetAndScrollStart = () => {
  const { num: offset, setNum: setOffset } = useNumber();
  const { num: scrollStart, setNum: setScrollStart } = useNumber();
  return { offset, setOffset, scrollStart, setScrollStart };
};

type ContainerProps = { ref: Ref<null | HTMLElement>; onScroll: () => void };
export const useSimulatedGridScroller = (containerProps: ContainerProps) => {
  const {
    offset: offsetHeight,
    scrollStart: scrollTop,
    setOffset: setOffsetHeight,
    setScrollStart: setScrollTop,
  } = useOffsetAndScrollStart();
  const {
    offset: offsetWidth,
    scrollStart: scrollLeft,
    setOffset: setOffsetWidth,
    setScrollStart: setScrollLeft,
  } = useOffsetAndScrollStart();

  const simulatedScroller = computed(() => ({
    offsetHeight: offsetHeight.value,
    offsetWidth: offsetWidth.value,
    scrollTop: scrollTop.value,
    scrollLeft: scrollLeft.value,
  }));

  const setContainerRef = () => {
    containerProps.ref.value = simulatedScroller.value as HTMLElement;
  };

  watch(
    () => simulatedScroller.value,
    () => {
      setContainerRef();
      containerProps.onScroll();
    },
  );

  return { setOffsetHeight, setScrollTop, setOffsetWidth, setScrollLeft };
};

export default (containerProps: ContainerProps, direction: Direction) => {
  const methods = useSimulatedGridScroller(containerProps);
  return {
    setOffset:
      direction === "vertical"
        ? methods.setOffsetHeight
        : methods.setOffsetWidth,
    setScrollStart:
      direction === "vertical" ? methods.setScrollTop : methods.setScrollLeft,
  };
};
