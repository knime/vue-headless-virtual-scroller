<script setup lang="ts">
import { reactive, ref } from 'vue';
import DemoGrid from './components/DemoGrid.vue';

const numRows = 1000;
const numCols = 100;

const data = reactive(
  Array.from({ length: numRows }, (_v, i) =>
    Array.from({ length: numCols }, (_w, j) => `${i}.${j}`)
  )
);
// eslint-disable-next-line no-magic-numbers
const rowHeight = ref(30);

const changeFirstCell = () => {
  data[0][0] = ':)';
};

const changeFirstRow = () => {
  data[0] = ['Hallo', 'Welt'];
};

const changeRowHeight = () => {
  rowHeight.value += 10;
};
</script>

<template>
  <h1>@knime/vue-headless-virtual-scroller demo</h1>
  <DemoGrid :data="data" :row-height="rowHeight" />
  <button @click="changeFirstCell">Change first cell</button>
  <button @click="changeFirstRow">Change first row</button>
  <button @click="changeRowHeight">rowHeight + 10</button>
</template>
