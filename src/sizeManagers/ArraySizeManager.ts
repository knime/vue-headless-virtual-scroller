import { type SizeManager } from "./SizeManager";
import { unref, type MaybeRef, computed, type Ref, watch } from "vue";

class BinarySearch {
  private isLeft: (index: number) => boolean;

  constructor(isLeft: (index: number) => boolean) {
    this.isLeft = isLeft;
  }

  getLastLeftIndex(max: number, min = 0): number {
    if (max - min <= 1) {
      if (this.isLeft(max)) {
        return max;
      }
      return min;
    }
    const next = Math.floor((max + min) / 2);
    if (this.isLeft(next)) {
      return this.getLastLeftIndex(max, next);
    }
    return this.getLastLeftIndex(next, min);
  }
}

export class ArraySizeManager implements SizeManager {
  private numItems: MaybeRef<number>;
  private accumulatedSizes: Ref<number[]>;

  constructor(sizes: MaybeRef<number[]>) {
    this.numItems = computed(() => unref(sizes).length);
    this.accumulatedSizes = computed(() => {
      const out = [0];
      for (let i = 0; i < unref(sizes).length; i++) {
        out.push(out[i] + unref(sizes)[i]);
      }
      return out;
    });
  }

  onUpdate(callback: () => void): void {
    watch([this.accumulatedSizes], callback);
  }

  toOffset(index: number): number {
    return this.accumulatedSizes.value[index];
  }

  getTotalSize(): number {
    return this.accumulatedSizes.value[unref(this.numItems)];
  }

  toIndex(position: number): number {
    if (position < 0) {
      return 0;
    }
    const binarySearch = new BinarySearch((i) => this.toOffset(i) <= position);
    return binarySearch.getLastLeftIndex(unref(this.numItems) - 1);
  }
}
