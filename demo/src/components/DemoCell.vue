<script setup lang="ts">
import { onMounted, ref } from "vue";

const backgroundColor = ref("red");

onMounted(() => {
  setTimeout(() => {
    backgroundColor.value = "green";
  }, 100);
});
</script>

<template>
  <td :style="{ backgroundColor }">
    <slot />
  </td>
</template>
