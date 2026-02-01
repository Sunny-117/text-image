<template>
  <canvas id="canvas3"></canvas>
</template>
<script setup>
import { onMounted } from "vue";
import { createTextImage } from "@sunny-117/text-image";
import video from './assets/1.mp4'

onMounted(() => {
  createTextImage({
    canvas: document.querySelector("#canvas3"),
    replaceText: "6",
    source: {
      video,
      width: 500,
      height: 700,
    },
  });
});
</script>
