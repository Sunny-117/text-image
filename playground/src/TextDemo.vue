<template>
  <canvas id="canvas1" style="width: 1000px;margin: 0 auto;"></canvas>
</template>

<script setup>
import { createTextImage } from "@sunny-117/text-image";
import { onMounted } from "vue";

onMounted(() => {
  createTextImage({
    canvas: document.querySelector("#canvas1"),
    source: {
      text: "Text Image",
      width: 500,
      height: 300,
    },
  });
});
</script>

<style scoped>
.titleBox {
  background-color: blueviolet;
}
</style>
