import type { SizeManager } from "@/sizeManagers/SizeManager";
import { Ref, watch } from "vue";

export const SIZE_AFTER_UPDATE = 1234;
export class TestSizeManager implements SizeManager {
  private _toIndex: (position: number) => number;
  private _toPosition: (index: number) => number;
  private _totalSize: number;
  private _updateTrigger: Ref<boolean>;

  constructor({
    totalSize,
    toIndex,
    toPosition,
    updateTrigger,
  }: {
    totalSize: number;
    toIndex: (position: number) => number;
    toPosition: (index: number) => number;
    updateTrigger: Ref<boolean>;
  }) {
    this._toIndex = toIndex;
    this._toPosition = toPosition;
    this._totalSize = totalSize;
    this._updateTrigger = updateTrigger;
  }

  onUpdate(callback: () => void): void {
    watch(() => this._updateTrigger.value, callback);
  }

  // eslint-disable-next-line no-magic-numbers
  public static DUMMY_SIZE = 1234;

  getTotalSize(): number {
    if (this._updateTrigger.value) {
      return SIZE_AFTER_UPDATE;
    }
    return this._totalSize;
  }

  toIndex(position: number): number {
    return this._toIndex(position);
  }

  toOffset(index: number): number {
    return this._toPosition(index);
  }
}
