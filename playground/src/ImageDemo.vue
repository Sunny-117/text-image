<template>
  <canvas id="canvas2"></canvas>
</template>

<script setup>
import { createTextImage } from "@sunny-117/text-image";
import { onMounted } from "vue";

onMounted(() => {
  const canvas = document.querySelector("#canvas2");
  console.log(canvas)
  createTextImage({
    canvas,
    raduis: 7,
    isGray: true,
    source: {
      img: "./assets/1.png",
      width: 800,
      height: 700,
    },
  });
});
</script>
