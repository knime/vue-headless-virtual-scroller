import { vi } from "vitest";

vi.mock("raf-throttle", () => ({
  default(func) {
    return function (...args) {
      // eslint-disable-next-line no-invalid-this
      return func.apply(this, args);
    };
  },
}));
