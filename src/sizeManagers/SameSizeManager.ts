import { type MaybeRef, unref } from "vue";

import type { SizeManager } from "./SizeManager";
import { watchMaybeRef } from "./utils";

const divideRoundedDown = (num: number, divisor: number) => {
  return Math.floor(num / divisor);
};

export class SameSizeManager implements SizeManager {
  private numItems: MaybeRef<number>;
  private size: MaybeRef<number>;

  constructor(numItems: MaybeRef<number>, size: MaybeRef<number>) {
    this.numItems = numItems;
    this.size = size;
  }

  getNumItems(): number {
    return unref(this.numItems);
  }

  onUpdate(callback: () => void): void {
    watchMaybeRef(this.numItems, callback);
    watchMaybeRef(this.size, callback);
  }

  toOffset(index: number): number {
    return index * unref(this.size);
  }

  getTotalSize(): number {
    return unref(this.numItems) * unref(this.size);
  }

  toIndex(position: number): number {
    return Math.max(
      Math.min(
        divideRoundedDown(position, unref(this.size)),
        unref(this.numItems) - 1,
      ),
      0,
    );
  }
}
