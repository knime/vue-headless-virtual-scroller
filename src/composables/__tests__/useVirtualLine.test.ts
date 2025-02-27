import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { flushPromises } from "@vue/test-utils";

import { SizeManager } from "@/sizeManagers";
import type { Direction } from "../types";
import useVirtualLine from "../useVirtualLine";

import { SIZE_AFTER_UPDATE, TestSizeManager } from "./utils/TestSizeManager";
import useSimulatedScroller from "./utils/useSimulatedScroller";

describe("useVirtualLine", () => {
  let toIndex: Mock,
    toPosition: Mock,
    sizeManager: SizeManager,
    triggerUpdate: () => void;
  const totalSize = 1000;

  beforeEach(() => {
    toIndex = vi.fn((position) => position);
    toPosition = vi.fn((index) => index);
    const updateTrigger = ref(false);
    triggerUpdate = () => {
      updateTrigger.value = true;
    };
    sizeManager = new TestSizeManager({
      toIndex,
      toPosition,
      totalSize,
      updateTrigger,
      numItems: 1000,
    });
  });

  it("provides container properties", () => {
    const { containerProps } = useVirtualLine({ sizeManager });
    expect(Object.keys(containerProps)).toEqual(["ref", "onScroll"]);
    expect(containerProps.ref.value).toBeNull();
    expect(containerProps.onScroll).toBeTypeOf("function");
  });

  it("provides initial startIndices", () => {
    const { indices } = useVirtualLine({ sizeManager });
    expect(toIndex).not.toHaveBeenCalled();
    expect(indices.value).toMatchObject({ startIndex: -500, endIndex: 501 });
    expect(toIndex).toHaveBeenCalledWith(500);
    expect(toIndex).toHaveBeenCalledWith(-500);
    expect(toPosition).not.toHaveBeenCalled();
  });

  it("does not yield an endIndex greater than the number of items", () => {
    const numItems = 10;
    const { indices } = useVirtualLine({
      sizeManager: new TestSizeManager({
        toIndex,
        toPosition,
        totalSize,
        updateTrigger: ref(false),
        numItems,
      }),
    });
    expect(indices.value).toMatchObject({ endIndex: numItems });
  });

  describe.each([
    ["vertical", "height", "Top"],
    ["horizontal", "width", "Left"],
  ] as const)(
    "in %s direction",
    (
      direction: Direction,
      heightOrWidth: "height" | "width",
      topOrLeft: "Top" | "Left",
    ) => {
      it("provides initial scrolledAreaStyles", () => {
        const { scrolledAreaStyles } = useVirtualLine(
          { sizeManager },
          direction,
        );
        expect(toPosition).not.toHaveBeenCalled();
        expect(scrolledAreaStyles.value).toEqual({
          [heightOrWidth]: "1000px",
          [`padding${topOrLeft}`]: "-500px",
          boxSizing: "border-box",
        });
        expect(toPosition).toHaveBeenCalledWith(-500);
      });

      describe("scrolling", () => {
        let scrolledAreaStyles: ReturnType<
            typeof useVirtualLine
          >["scrolledAreaStyles"],
          indices: ReturnType<typeof useVirtualLine>["indices"],
          setScrollStart: (value: number) => void;

        beforeEach(() => {
          const virtualLine = useVirtualLine({ sizeManager }, direction);
          scrolledAreaStyles = virtualLine.scrolledAreaStyles;
          indices = virtualLine.indices;
          const simulatedScroller = useSimulatedScroller(
            virtualLine.containerProps,
            direction,
          );
          simulatedScroller.setOffset(100);
          setScrollStart = simulatedScroller.setScrollStart;
        });

        it("adjusts initial indices by offset", () => {
          expect(indices.value).toMatchObject({
            startIndex: -500,
            endIndex: 601,
          });
        });

        it("adjusts initial indices by scroll start", async () => {
          setScrollStart(100);
          await flushPromises();
          expect(indices.value).toMatchObject({
            startIndex: -400,
            endIndex: 701,
          });
        });

        it("sets scrolledAreaStyles on scroll", async () => {
          setScrollStart(100);
          await flushPromises();
          expect(scrolledAreaStyles.value).toEqual({
            [heightOrWidth]: "1000px",
            [`padding${topOrLeft}`]: "-400px",
            boxSizing: "border-box",
          });
        });
      });

      it("refreshes computed props on update trigger", async () => {
        const { scrolledAreaStyles } = useVirtualLine(
          { sizeManager },
          direction,
        );

        triggerUpdate();
        await flushPromises();
        expect(scrolledAreaStyles.value[heightOrWidth]).toBe(
          `${SIZE_AFTER_UPDATE}px`,
        );
      });
    },
  );
});
