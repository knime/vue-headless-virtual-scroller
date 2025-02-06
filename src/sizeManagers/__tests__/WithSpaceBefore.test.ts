import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { flushPromises } from "@vue/test-utils";

import { SameSizeManager } from "../SameSizeManager";
import { WithSpaceBefore } from "../WithSpaceBefore";

describe("WithSpaceBefore", () => {
  const delegate = new SameSizeManager(10, 10);

  it("computes index from position with space before", () => {
    const withSpaceBefore = new WithSpaceBefore(
      { spaceBefore: 5, spaceBeforeIsOffset: true },
      delegate,
    );
    expect(withSpaceBefore.toIndex(0)).toBe(0);
    expect(withSpaceBefore.toIndex(10)).toBe(0);
    expect(withSpaceBefore.toIndex(14)).toBe(0);
    expect(withSpaceBefore.toIndex(15)).toBe(1);
    expect(withSpaceBefore.toIndex(24)).toBe(1);
  });

  it("computes offset from index with space before as offset", () => {
    const withSpaceBeforeAsOffset = new WithSpaceBefore(
      { spaceBefore: 5, spaceBeforeIsOffset: true },
      delegate,
    );
    expect(withSpaceBeforeAsOffset.toOffset(0)).toBe(5);
    expect(withSpaceBeforeAsOffset.toOffset(3)).toBe(35);
  });

  it("computes offset from index without space before as offset", () => {
    const withSpaceBeforeAsOffset = new WithSpaceBefore(
      { spaceBefore: 5, spaceBeforeIsOffset: false },
      delegate,
    );
    expect(withSpaceBeforeAsOffset.toOffset(0)).toBe(0);
    expect(withSpaceBeforeAsOffset.toOffset(3)).toBe(30);
  });

  it("computes total size with offset", () => {
    const spaceBefore = 5;
    const withSpaceBeforeAsOffset = new WithSpaceBefore(
      { spaceBefore, spaceBeforeIsOffset: false },
      delegate,
    );
    expect(withSpaceBeforeAsOffset.getTotalSize()).toBe(
      delegate.getTotalSize() + spaceBefore,
    );
  });

  describe("updates", () => {
    it("updates when the delegates input changes", async () => {
      const size = ref(100);
      const numItems = ref(20);
      const delegate = new SameSizeManager(numItems, size);
      const withSpaceBeforeAsOffset = new WithSpaceBefore(
        { spaceBefore: 5, spaceBeforeIsOffset: false },
        delegate,
      );
      const callback = vi.fn();
      withSpaceBeforeAsOffset.onUpdate(callback);
      size.value = 101;
      await flushPromises();
      expect(callback).toHaveBeenCalled();
    });

    it("updates when the input changes", async () => {
      const spaceBefore = ref(5);
      const withSpaceBeforeAsOffset = new WithSpaceBefore(
        { spaceBefore, spaceBeforeIsOffset: false },
        delegate,
      );
      const callback = vi.fn();
      withSpaceBeforeAsOffset.onUpdate(callback);
      spaceBefore.value = 10;
      await flushPromises();
      expect(callback).toHaveBeenCalled();
    });
  });
});
