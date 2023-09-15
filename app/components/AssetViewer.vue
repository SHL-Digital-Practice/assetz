<template>
  <div class="flex h-full" ref="container">
    <!-- <canvas class="w-full h-full bg-red-300"></canvas> -->
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

    await viewer.loadObject(
      `https://speckle.xyz/streams/${props.project_id}/objects/${props.speckle_id}`,
      undefined,
      undefined,
      true
    );
  }
});
</script>

<style scoped>
.active {
  view-transition-name: selected-film;
  contain: layout;
}
</style>
