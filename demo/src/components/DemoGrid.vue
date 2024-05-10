<script setup lang="ts">
import {
  useVirtualGrid,
  SameSizeManager,
  ArraySizeManager,
} from "@knime/vue-headless-virtual-scroller";

import DemoCell from "./DemoCell.vue";
import { toRef } from "vue";

const props = defineProps<{
  data?: string[][];
  rowHeight: number;
}>();

const numRows = 1000;
// eslint-disable-next-line no-magic-numbers
const columnWidths = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140];

const {
  containerProps,
  indices: { vertical, horizontal },
  scrolledAreaStyles: { horizontal: hStyles, vertical: vStyles },
} = useVirtualGrid({
  rows: {
    sizeManager: new SameSizeManager(numRows, toRef(props, "rowHeight")),
  },
  columns: { sizeManager: new ArraySizeManager(columnWidths) },
});
</script>

<template>
  <table v-bind="containerProps">
    <tbody :style="{ ...hStyles, ...vStyles }">
      <tr
        v-for="rowInd in vertical.toArray()"
        :key="rowInd"
        :style="{ height: `${rowHeight}px` }"
      >
        <template v-for="colInd in horizontal.toArray()" :key="colInd">
          <DemoCell :style="{ width: `${columnWidths[colInd]}px` }">
            {{ data?.[rowInd][colInd] }}
          </DemoCell>
        </template>
      </tr>
    </tbody>
  </table>
  {{ containerProps }}<br />
  {{ vertical }}<br />
  {{ horizontal }}<br />
  {{ vStyles }}<br />
  {{ hStyles }}<br />
</template>

<style lang="postcss" scoped>
table {
  border: 1px solid black;
  height: 300px;
  width: 100%;
  overflow: auto auto;
  display: block;
}

tbody {
  display: inline-block;
  flex-direction: column;
  background-color: lightblue;
}

tr {
  background-size: contain;
  border: 1px solid gray;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
}

td {
  border: 1px solid orange;
}
</style>
