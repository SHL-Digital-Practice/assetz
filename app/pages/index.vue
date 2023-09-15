<template>
  <div>
    <h1 class="absolute text-9xl font-medium text-blue-500">Assetz</h1>
    <div class="h-screen bg-slate-400">
      <div class="grid grid-cols-2 h-full">
        <div
          v-for="i in 7"
          :key="i"
          :class="(i + Math.floor(i / 4)) % 2 ? 'bg-blue-200' : 'bg-blue-300'"
        >
          <AssetViewer
            v-if="data"
            :project_id="data[i].project_id!"
            :speckle_id="data[i].speckle_id!"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~/types/database.types";

const db = useSupabaseClient<Database>();

const { data, pending } = useAsyncData("tasks", async () => {
  const { data, error } = await db.from("assets").select().limit(8);
  return data;
});
</script>
