<template>
  <canvas id="canvas3"></canvas>
</template>
<script setup>
import { onMounted } from "vue";
import { createTextImage } from "@sunny-117/text-image";
onMounted(() => {
  createTextImage({
    canvas: document.querySelector("#canvas3"),
    replaceText: "6",
    source: {
      video: "./assets/1.mp4",
      width: 500,
      height: 700,
    },
  });
});
</script>
