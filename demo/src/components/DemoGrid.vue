<script setup lang="ts">
import { useVirtualGrid } from "@knime/vue-headless-virtual-scroller";
import DemoCell from "./DemoCell.vue";
import { SizeManagerWithSizes } from "../stories/constructSizeManagerWithSizes";

const props = defineProps<{
  rowSizeManager: SizeManagerWithSizes;
  columnSizeManager: SizeManagerWithSizes;
}>();

const {
  containerProps,
  indices: { vertical, horizontal },
  scrolledAreaStyles: { horizontal: hStyles, vertical: vStyles },
} = useVirtualGrid({
  rows: { sizeManager: props.rowSizeManager.sizeManager },
  columns: { sizeManager: props.columnSizeManager.sizeManager },
});
</script>

<template>
  <table v-bind="containerProps">
    <tbody :style="{ ...hStyles, ...vStyles }">
      <tr
        v-for="rowInd in vertical.toArray()"
        :key="rowInd"
        :style="{ height: `${rowSizeManager.sizes(rowInd)}px` }"
      >
        <DemoCell
          v-for="colInd in horizontal.toArray()"
          :key="colInd"
          :style="{ width: `${columnSizeManager.sizes(colInd)}px` }"
        >
          {{ rowInd }}:{{ colInd }}
        </DemoCell>
      </tr>
    </tbody>
  </table>
</template>

<style lang="postcss" scoped>
table {
  height: 300px;
  width: 100%;
  overflow: auto;
  display: block;
}

tbody {
  display: inline-block;
  flex-direction: column;
}

tr {
  background-size: contain;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
}
</style>
