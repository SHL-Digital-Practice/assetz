<template>
  <div>
    <h1 class="absolute text-9xl font-medium text-blue-500 z-30">Assetz</h1>
    <AssetPagination @paginate="refresh">
      <div class="grid grid-cols-3 grid-rows-3 h-full max-w-6xl">
        <template v-for="(asset, i) of assets" :key="asset.id">
          <NuxtLink
            :to="`/asset/${asset.id}`"
            @click.native="active = asset.id"
          >
            <AssetCard
              :class="[
                { active: active === asset.id },
                i % 2 === 1 ? 'bg-blue-900' : 'bg-blue-950',
                'hover:bg-blue-600 scale-90 hover:scale-95 rounded-md',
              ]"
              :project_id="asset.project_id!"
              :speckle_id="asset.speckle_id!"
            />
          </NuxtLink>
        </template>
      </div>
    </AssetPagination>
  </div>
</template>

<script setup lang="ts">
const db = useSupabaseClient<Database>();

const active = useState<string>();
const page = usePage();

const {
  data: assets,
  pending,
  refresh,
} = useAsyncData("assets", async () => {
  const { data, error } = await db
    .from("assets")
    .select()
    .range(page.value * 8, (page.value + 1) * 8);
  return data;
});
</script>
<style scoped>
h1 {
  view-transition-name: header;
}

.active {
  view-transition-name: graphic;
  contain: layout;
}
</style>
