<template>
  <div class="flex h-full">
    <img :src="thumbnail" class="object-cover" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  speckle_id: string; // Object Id
  project_id: string; // Stream Id
}>();

const thumbnail = ref<string>(
  `https://speckle.xyz/preview/${props.project_id}/objects/${props.speckle_id}`
);
</script>

<style scoped>
.active {
  view-transition-name: selected-film;
  contain: layout;
}
</style>
