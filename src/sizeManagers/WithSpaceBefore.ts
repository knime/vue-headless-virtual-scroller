import { type MaybeRef, unref } from "vue";

import { type SizeManager, SizeManagerDecorator } from "./SizeManager";
import { watchMaybeRef } from "./utils";

/**
 * A decorator for adding space at the start of the scrollable element which should not be taken by virtually scrolled elements
 */
export class WithSpaceBefore extends SizeManagerDecorator {
  private spaceBefore: MaybeRef<number>;
  private spaceBeforeIsOffset: boolean;

  constructor(
    {
      spaceBefore,
      spaceBeforeIsOffset,
    }: {
      spaceBefore: MaybeRef<number>;
      /**
       * Whether the space before should be part of the provided offset in the wrapper props.
       * > Use `true` if only absolutely placed elements should occupy this offset space.
       * > Use `false` if there are relative elements occupying the space.
       *     In this case these need to have exactly the given `spaceBefore` size.
       *     Otherwise the visible items are shifted and one might see empty spaces.
       */
      spaceBeforeIsOffset: boolean;
    },
    delegate: SizeManager,
  ) {
    super(delegate);
    this.spaceBefore = spaceBefore;
    this.spaceBeforeIsOffset = spaceBeforeIsOffset;
  }

  onUpdate(callback: () => void): void {
    super.onUpdate(callback);
    watchMaybeRef(this.spaceBefore, callback);
  }

  toOffset(index: number): number {
    return (
      (this.spaceBeforeIsOffset ? unref(this.spaceBefore) : 0) +
      super.toOffset(index)
    );
  }

  getTotalSize(): number {
    return unref(this.spaceBefore) + super.getTotalSize();
  }

  toIndex(position: number): number {
    return super.toIndex(position - unref(this.spaceBefore));
  }
}
