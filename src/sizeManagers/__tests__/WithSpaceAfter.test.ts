import { describe, expect, it, vi } from "vitest";
import { SameSizeManager } from "../SameSizeManager";
import { ref } from "vue";
import { flushPromises } from "@vue/test-utils";
import { WithSpaceAfter } from "../WithSpaceAfter";

describe("WithSpaceAfter", () => {
  const delegate = new SameSizeManager(10, 10);

  it("computes index as for the delegate", () => {
    const withSpaceAfter = new WithSpaceAfter(5, delegate);
    expect(withSpaceAfter.toIndex(0)).toBe(0);
    expect(withSpaceAfter.toIndex(10)).toBe(1);
  });

  it("computes offset as for the delegate", () => {
    const withSpaceAfter = new WithSpaceAfter(5, delegate);
    expect(withSpaceAfter.toOffset(0)).toBe(0);
    expect(withSpaceAfter.toOffset(3)).toBe(30);
  });

  it("computes total size with space after", () => {
    const spaceAfter = 5;
    const withSpaceAfter = new WithSpaceAfter(spaceAfter, delegate);
    expect(withSpaceAfter.getTotalSize()).toBe(
      delegate.getTotalSize() + spaceAfter,
    );
  });

  describe("updates", () => {
    it("updates when the delegates input changes", async () => {
      const size = ref(100);
      const numItems = ref(20);
      const delegate = new SameSizeManager(numItems, size);
      const withSpaceAfter = new WithSpaceAfter(5, delegate);
      const callback = vi.fn();
      withSpaceAfter.onUpdate(callback);
      size.value = 101;
      await flushPromises();
      expect(callback).toHaveBeenCalled();
    });

    it("updates when input changes", async () => {
      const spaceAfter = ref(5);
      const withSpaceAfter = new WithSpaceAfter(spaceAfter, delegate);
      const callback = vi.fn();
      withSpaceAfter.onUpdate(callback);
      spaceAfter.value = 10;
      await flushPromises();
      expect(callback).toHaveBeenCalled();
    });
  });
});
