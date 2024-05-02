import { MaybeRef, isRef, watch } from "vue";

/**
 * If the parameter is a ref, then call the callback whenever it is changed.
 */
export const watchMaybeRef = (maybeRef: MaybeRef, callback: () => void) =>
  isRef(maybeRef) && watch(() => maybeRef.value, callback);
