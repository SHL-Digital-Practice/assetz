<template>
  <div class="transition cursor-pointer flex h-full">
    <img :src="thumbnail" class="object-contain" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  speckle_id: string; // Object Id
  project_id: string; // Stream Id
}>();

const thumbnail = computed(
  () =>
    `https://speckle.xyz/preview/${props.project_id}/objects/${props.speckle_id}`
);
</script>
<style scoped></style>
