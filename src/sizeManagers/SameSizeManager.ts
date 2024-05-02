import { unref, type MaybeRef } from "vue";
import type { SizeManager } from "./SizeManager";
import { watchMaybeRef } from "./utils";

export const clipToBounds = (value: number, upperBound: number) => {
  return Math.max(Math.min(value, upperBound - 1), 0);
};

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
    return clipToBounds(
      divideRoundedDown(position, unref(this.size)),
      unref(this.numItems),
    );
  }
}
