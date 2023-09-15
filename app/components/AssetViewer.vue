<template>
  <div class="flex h-full">
    <canvas ref="container" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { DefaultViewerParams, Viewer } from "@speckle/viewer";

const props = defineProps<{
  speckle_id: string; // Object Id
  project_id: string; // Stream Id
}>();

const container = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
  if (container.value) {
    console.log(
      `https://speckle.xyz/streams/${props.project_id}/objects/${props.speckle_id}`
    );
    const viewer = new Viewer(container.value, DefaultViewerParams);
    await viewer.init();
    console.log("viewer initialized");
    await viewer.loadObject(
      `https://speckle.xyz/streams/${props.project_id}/objects/${props.speckle_id}`,
      undefined,
      undefined,
      true
    );
    console.log("object loaded");
  }
});
</script>

<style scoped></style>
