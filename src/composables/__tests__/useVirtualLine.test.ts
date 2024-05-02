import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import useVirtualLine from "../useVirtualLine";
import { SIZE_AFTER_UPDATE, TestSizeManager } from "./utils/TestSizeManager";
import useSimulatedScroller from "./utils/useSimulatedScroller";
import type { Direction } from "../types";
import { flushPromises } from "@vue/test-utils";
import { SizeManager } from "@/sizeManagers";
import { ref } from "vue";

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
