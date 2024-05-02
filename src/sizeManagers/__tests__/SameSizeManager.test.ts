import { describe, expect, it, vi } from "vitest";
import { SameSizeManager } from "../SameSizeManager";
import { ref } from "vue";
import { flushPromises } from "@vue/test-utils";

describe("SameSizeManager", () => {
  const sizeManager = new SameSizeManager(100, 20);

  it("computes index from position", () => {
    expect(sizeManager.toIndex(88)).toBe(4);
    // bounds
    expect(sizeManager.toIndex(0)).toBe(0);
    expect(sizeManager.toIndex(1999)).toBe(99);
    // out of bounds
    expect(sizeManager.toIndex(-10)).toBe(0);
    expect(sizeManager.toIndex(3000)).toBe(99);
    expect(sizeManager.toIndex(2000)).toBe(99);
  });

  it("computes position from index", () => {
    expect(sizeManager.toOffset(0)).toBe(0);
    expect(sizeManager.toOffset(4)).toBe(80);
    expect(sizeManager.toOffset(100)).toBe(2000);
  });

  it("computes total size", () => {
    expect(sizeManager.getTotalSize()).toBe(2000);
  });

  it("updates when the input changes", async () => {
    const size = ref(100);
    const numItems = ref(20);
    const sizeManager = new SameSizeManager(numItems, size);
    const callback = vi.fn();
    sizeManager.onUpdate(callback);
    size.value = 101;
    await flushPromises();
    expect(callback).toHaveBeenCalledTimes(1);
    numItems.value = 21;
    await flushPromises();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
