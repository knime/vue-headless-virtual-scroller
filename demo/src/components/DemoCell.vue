<script setup lang="ts">
import { onMounted, ref } from "vue";

const backgroundColor = ref("red");

onMounted(() => {
  setTimeout(() => {
    backgroundColor.value = "unset";
  }, 100);
});
</script>

<template>
  <td :style="{ backgroundColor }">
    <slot />
  </td>
</template>

<style lang="postcss" scoped>
td {
  border: 1px solid grey;
  border-radius: 10px;
  font-size: x-small;
  text-align: center;
  margin: 1px;
}
</style>
