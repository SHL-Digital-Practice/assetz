<template>
  <div class="grid grid-cols-3 grid-rows-3 h-screen max-w-6xl">
    <template v-for="(asset, index) of assets" :key="asset.id">
      <slot v-bind="{ asset, index }"></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  assets:
    | {
        id: string;
        speckle_id: string | null;
        project_id: string | null;
      }[]
    | null;
}>();
</script>

<style scoped></style>
