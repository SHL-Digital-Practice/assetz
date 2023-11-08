<template>
  <div>
    <h1 class="absolute text-9xl font-medium text-blue-500 z-30">Assetz</h1>
    <div class="h-screen bg-blue-800 flex justify-center">
      <div class="h-full flex flex-col items-center justify-center">
        <Icon
          @click="paginate(-1)"
          name="octicon:chevron-up-12"
          color="white"
          class="-rotate-90 w-20 h-20 text-white hover:text-blue-200 transition"
        />
      </div>
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
      <div class="h-full flex flex-col items-center justify-center">
        <Icon
          @click="paginate(1)"
          name="octicon:chevron-up-12"
          class="rotate-90 w-20 h-20 text-white hover:text-blue-200 transition"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const db = useSupabaseClient<Database>();

const active = useState<string>();
const activePage = useState<number>("activePage", () => 0);

const {
  data: assets,
  pending,
  refresh,
} = useAsyncData("assets", async () => {
  const { data, error } = await db
    .from("assets")
    .select()
    .range(activePage.value * 8, (activePage.value + 1) * 8);
  return data;
});

function paginate(direction: number) {
  activePage.value += direction;
  refresh();
}
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
