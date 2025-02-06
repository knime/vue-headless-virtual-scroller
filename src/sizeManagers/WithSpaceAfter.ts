import { type MaybeRef, unref } from "vue";

import { type SizeManager, SizeManagerDecorator } from "./SizeManager";
import { watchMaybeRef } from "./utils";

/**
 * A decorator for adding space at the end of the scrollable element which should not be taken by virtually scrolled elements
 */
export class WithSpaceAfter extends SizeManagerDecorator {
  private spaceAfter: MaybeRef<number>;

  constructor(spaceAfter: MaybeRef<number>, delegate: SizeManager) {
    super(delegate);
    this.spaceAfter = spaceAfter;
  }

  onUpdate(callback: () => void): void {
    super.onUpdate(callback);
    watchMaybeRef(this.spaceAfter, callback);
  }

  getTotalSize(): number {
    return super.getTotalSize() + unref(this.spaceAfter);
  }
}
