import { describe, expect, it, vi } from "vitest";
import { ArraySizeManager } from "../ArraySizeManager";
import { ref } from "vue";
import { flushPromises } from "@vue/test-utils";

describe("ArrayIndividualSizeManager", () => {
  const sizeManager = new ArraySizeManager([10, 20, 30, 40, 50]);

  it("provides number of items", () => {
    expect(sizeManager.getNumItems()).toBe(5);
  });

  it("computes index from position", () => {
    expect(sizeManager.toIndex(0)).toBe(0);
    expect(sizeManager.toIndex(5)).toBe(0);
    expect(sizeManager.toIndex(15)).toBe(1);
    expect(sizeManager.toIndex(25)).toBe(1);
    expect(sizeManager.toIndex(35)).toBe(2);
    expect(sizeManager.toIndex(55)).toBe(2);
    expect(sizeManager.toIndex(65)).toBe(3);
    expect(sizeManager.toIndex(95)).toBe(3);
    expect(sizeManager.toIndex(105)).toBe(4);
    expect(sizeManager.toIndex(145)).toBe(4);
    // out of bounds
    expect(sizeManager.toIndex(-10)).toBe(0);
    expect(sizeManager.toIndex(150)).toBe(4);
    expect(sizeManager.toIndex(160)).toBe(4);
  });

  it("computes position from index", () => {
    expect(sizeManager.toOffset(0)).toBe(0);
    expect(sizeManager.toOffset(1)).toBe(10);
    expect(sizeManager.toOffset(2)).toBe(30);
    expect(sizeManager.toOffset(3)).toBe(60);
    expect(sizeManager.toOffset(4)).toBe(100);
    expect(sizeManager.toOffset(5)).toBe(150);
  });

  it("computes total size", () => {
    expect(sizeManager.getTotalSize()).toBe(150);
  });

  it("updates when the input changes", async () => {
    const refSizes = ref([1, 2, 3, 4]);
    const sizeManager = new ArraySizeManager(refSizes);
    const callback = vi.fn();
    sizeManager.onUpdate(callback);
    refSizes.value.push(5);
    await flushPromises();
    expect(callback).toHaveBeenCalled();
  });
});
