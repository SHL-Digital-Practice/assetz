<template>
  <div class="w-screen h-screen bg-blue-950">
    <h1 class="absolute text-7xl font-medium text-blue-500" v-if="!pending">
      {{ asset?.name }}
    </h1>
    <div class="w-full h-full flex items-center justify-center">
      <NuxtLink class="font-bold hover:underline -rotate-90 text-white" to="/">
        Back to gallery
      </NuxtLink>
      <!-- viewer -->
      <div class="h-2/3 w-1/3 bg-blue-900 rounded-md active" ref="container" />

      <!-- info -->
      <div class="flex flex-col px-2">
        <Transition
          enter-active-class="transition ease-in-out duration-500 transform"
          enter-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
        >
          <div class="w-56">
            <template v-for="key in Object.keys(asset)" v-if="!pending">
              <p class="text-white font-bold">
                {{ key }}: <span class="font-light">{{ asset[key] }}</span>
              </p>
            </template>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Viewer, DefaultViewerParams } from "@speckle/viewer";

const route = useRoute();
const db = useSupabaseClient<Database>();
const container = ref<HTMLCanvasElement | null>(null);

const { data: asset, pending } = useAsyncData("asset", async () => {
  const { data, error } = await db
    .from("assets")
    .select()
    .eq("id", route.params.id)
    .single();
  return data;
});

watch(asset, () => {
  setTimeout(async () => {
    if (!container.value) return;

    const viewer = new Viewer(container.value, DefaultViewerParams);
    viewer.enableMeasurements(true);

    await viewer.init();
    viewer.loadObject(
      `https://speckle.xyz/streams/${asset.value.project_id}/objects/${asset.value.speckle_id}`,
      undefined,
      undefined,
      true
    );
  }, 300);
});
</script>

<style scoped>
h1 {
  view-transition-name: header;
}

.active {
  view-transition-name: graphic;
}
</style>

<style></style>
