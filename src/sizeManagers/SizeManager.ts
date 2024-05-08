export interface SizeManager {
  getTotalSize(): number;
  toIndex(position: number): number;
  getNumItems(): number;
  toOffset(index: number): number;
  onUpdate(callback: () => void): void;
}

export class SizeManagerDecorator implements SizeManager {
  private delegate: SizeManager;

  constructor(delegate: SizeManager) {
    this.delegate = delegate;
  }

  getTotalSize(): number {
    return this.delegate.getTotalSize();
  }

  toIndex(position: number): number {
    return this.delegate.toIndex(position);
  }

  getNumItems(): number {
    return this.delegate.getNumItems();
  }

  toOffset(index: number): number {
    return this.delegate.toOffset(index);
  }

  onUpdate(callback: () => void): void {
    this.delegate.onUpdate(callback);
  }
}
