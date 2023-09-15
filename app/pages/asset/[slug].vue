<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
</script>

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
      <NuxtLink class="font-bold hover:underline" to="/">
        Back to gallery</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
h1 {
  view-transition-name: header;
}
</style>

<style></style>
