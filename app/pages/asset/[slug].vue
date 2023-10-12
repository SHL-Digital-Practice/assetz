<template>
  <div class="w-screen h-screen">
    <h1 class="absolute text-7xl font-medium text-blue-500">Assetzzzz</h1>
    <div class="w-full h-full bg-blue-400 flex items-center justify-center">
      <!-- <AssetViewer
        v-if="asset"
        :project_id="asset.project_id!"
        :speckle_id="asset.speckle_id!"
      </div>
      /> -->
      <div class="h-36 w-36 bg-red-200" ref="container" />
      <NuxtLink class="font-bold hover:underline" to="/">
        Back to gallery</NuxtLink
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { Viewer, DefaultViewerParams } from "@speckle/viewer";

const config = useRuntimeConfig();
const route = useRoute();
const container = ref<HTMLCanvasElement | null>(null);

onMounted(async () => {
  const objectId = route.params.slug;

  //speckle.xyz/preview/31409c1df6
  // https: console.log("mounted");
  // https://stackblitz.com/edit/nuxt-view-transitions?file=components%2FImageGallery.vue

  if (!container.value) return;
  const viewer = new Viewer(container.value, DefaultViewerParams);
  await viewer.init();

  await viewer.loadObject(
    `https://speckle.xyz/streams/${props.project_id}/objects/${objectId}`,
    undefined,
    undefined,
    true
  );
});
</script>

<style scoped>
h1 {
  view-transition-name: header;
}
</style>

<style></style>
