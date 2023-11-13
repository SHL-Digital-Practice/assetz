<template>
  <div>
    <h1 class="absolute text-9xl font-medium text-blue-500 z-30 select-none">
      Assetz
    </h1>
    <AssetPagination @paginate="refresh">
      <AssetGrid :assets="assets" v-slot="{ asset, index }">
        <NuxtLink :to="`/asset/${asset.id}`" @click.native="active = asset.id">
          <AssetCard
            :speckle_id="asset.speckle_id"
            :project_id="asset.project_id"
            :class="[
              { active: active === asset.id },
              index % 2 === 1 ? 'bg-blue-900' : 'bg-blue-950',
              'hover:bg-blue-600 scale-90 hover:scale-95 rounded-md',
            ]"
          />
        </NuxtLink>
      </AssetGrid>
    </AssetPagination>
  </div>
</template>

<script setup lang="ts">
const active = useState<string>();

const page = usePage();

const {
  data: assets,
  pending,
  refresh,
} = await useFetch("/api/assets", { query: { page } });
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
