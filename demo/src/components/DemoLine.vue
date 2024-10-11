<script setup lang="ts">
import { useVirtualLine } from "@knime/vue-headless-virtual-scroller";
import DemoCell from "./DemoCell.vue";
import { SizeManagerWithSizes } from "../stories/constructSizeManagerWithSizes";

const props = defineProps<{
  direction: "horizontal" | "vertical";
  sizeManager: SizeManagerWithSizes;
}>();

const { containerProps, indices, scrolledAreaStyles } = useVirtualLine(
  {
    sizeManager: props.sizeManager.sizeManager,
  },
  props.direction,
);
</script>

<template>
  <div
    :class="['container', { vertical: direction === 'vertical' }]"
    v-bind="containerProps"
  >
    <div
      :style="{
        ...scrolledAreaStyles,
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
      }"
      class="scrolled-area"
    >
      <DemoCell
        v-for="ind in indices.toArray()"
        :key="ind"
        :style="{
          [direction === 'horizontal' ? 'width' : 'height']:
            `${sizeManager.sizes(ind)}px`,
        }"
      >
        {{ ind }}
      </DemoCell>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.container {
  width: 100%;
  overflow: auto;

  &.vertical {
    height: 300px;
  }
}

.scrolled-area {
  display: flex;
}
</style>
