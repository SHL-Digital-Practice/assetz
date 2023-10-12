<template>
  <div>
    <h1 class="absolute text-9xl font-medium text-blue-500">Assetz</h1>
    <div class="h-screen bg-slate-400">
      <div class="grid grid-cols-3 grid-rows-2 h-full">
        <div
          v-for="(asset, i) of assets"
          :key="asset.id"
          :class="i % 2 === 1 ? 'bg-blue-200' : 'bg-blue-300'"
          class="hover:bg-blue-900 transition cursor-pointer"
        >
          <NuxtLink
            :to="`/asset/${asset.id}`"
            @click.native="active = asset.id"
          >
            <AssetCard
              :class="{ active: active === asset.id }"
              :project_id="asset.project_id!"
              :speckle_id="asset.speckle_id!"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~/types/database.types";

const db = useSupabaseClient<Database>();
const active = useState();

const { data: assets, pending } = useAsyncData("assets", async () => {
  const { data, error } = await db.from("assets").select().limit(6);
  return data;
});
</script>
<style scoped>
h1 {
  view-transition-name: header;
}
</style>
