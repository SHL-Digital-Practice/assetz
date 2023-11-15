<template>
  <div class="transition cursor-pointer flex h-full w-80">
    <img :src="thumbnail" class="object-contain" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  speckle_id?: string | null; // Object Id
  project_id?: string | null; // Stream Id
}>();

const thumbnail = computed(() =>
  props.speckle_id && props.project_id
    ? `https://speckle.xyz/preview/${props.project_id}/objects/${props.speckle_id}`
    : "https://avatars.githubusercontent.com/u/65039012?s=200&v=4"
);
</script>
<style scoped></style>
