import { beforeEach, describe, expect, it } from "vitest";
import { TestSizeManager } from "./utils/TestSizeManager";
import { useSimulatedGridScroller } from "./utils/useSimulatedScroller";
import { flushPromises } from "@vue/test-utils";
import useVirtualGrid from "../useVirtualGrid";
import { ref } from "vue";

describe("useVirtualGrid", () => {
  let virtualGrid: ReturnType<typeof useVirtualGrid>;
  const totalWidth = 1000;
  const totalHeight = 2000;

  beforeEach(() => {
    const toIndex = (position: number) => position;
    const toPosition = (index: number) => index;
    const commonParams = {
      toIndex,
      toPosition,
      updateTrigger: ref(false),
      numItems: 1000,
    };
    const rowSizeManager = new TestSizeManager({
      totalSize: totalHeight,
      ...commonParams,
    });
    const columnSizeManager = new TestSizeManager({
      totalSize: totalWidth,
      ...commonParams,
    });

    virtualGrid = useVirtualGrid({
      rows: { sizeManager: rowSizeManager },
      columns: { sizeManager: columnSizeManager },
    });
  });

  describe("initialization", () => {
    it("provides container properties", () => {
      const { containerProps } = virtualGrid;
      expect(Object.keys(containerProps)).toEqual(["ref", "onScroll"]);
      expect(containerProps.ref.value).toBeNull();
      expect(containerProps.onScroll).toBeTypeOf("function");
    });

    it("provides initial startIndices", () => {
      const { indices } = virtualGrid;
      expect(indices.vertical.value).toMatchObject({
        startIndex: -500,
        endIndex: 501,
      });
      expect(indices.horizontal.value).toMatchObject({
        startIndex: -500,
        endIndex: 501,
      });
    });

    it("provides initial wrapper styles", () => {
      const { scrolledAreaStyles } = virtualGrid;
      expect(scrolledAreaStyles.vertical.value).toStrictEqual({
        height: "2000px",
        paddingTop: "-500px",
      });
      expect(scrolledAreaStyles.horizontal.value).toStrictEqual({
        width: "1000px",
        paddingLeft: "-500px",
      });
    });
  });

  describe("scrolling", () => {
    let simulatedScroller: ReturnType<typeof useSimulatedGridScroller>;

    beforeEach(() => {
      simulatedScroller = useSimulatedGridScroller(virtualGrid.containerProps);
      simulatedScroller.setOffsetHeight(100);
      simulatedScroller.setOffsetWidth(100);
    });

    it("adjusts initial indices by offset", () => {
      expect(virtualGrid.indices.horizontal.value).toMatchObject({
        startIndex: -500,
        endIndex: 601,
      });
      expect(virtualGrid.indices.vertical.value).toMatchObject({
        startIndex: -500,
        endIndex: 601,
      });
    });

    it("adjusts initial indices by scroll left", async () => {
      simulatedScroller.setScrollLeft(100);
      await flushPromises();
      expect(virtualGrid.indices.horizontal.value).toMatchObject({
        startIndex: -400,
        endIndex: 701,
      });
    });

    it("adjusts initial indices by scroll top", async () => {
      simulatedScroller.setScrollTop(100);
      await flushPromises();
      expect(virtualGrid.indices.vertical.value).toMatchObject({
        startIndex: -400,
        endIndex: 701,
      });
    });

    it("sets wrapperStyles on scroll", async () => {
      simulatedScroller.setScrollTop(100);
      simulatedScroller.setScrollLeft(200);
      await flushPromises();
      expect(virtualGrid.scrolledAreaStyles.vertical.value).toStrictEqual({
        height: "2000px",
        paddingTop: "-400px",
      });
      expect(virtualGrid.scrolledAreaStyles.horizontal.value).toStrictEqual({
        width: "1000px",
        paddingLeft: "-300px",
      });
    });
  });
});
