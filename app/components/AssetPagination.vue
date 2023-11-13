<template>
  <div class="h-screen bg-blue-800 flex justify-center">
    <div class="h-full flex flex-col items-center justify-center w-20">
      <Icon
        @click="paginate(-1)"
        name="octicon:chevron-up-12"
        color="white"
        class="-rotate-90 w-20 h-20 text-white hover:text-blue-200 transition"
        v-if="page > 0"
      />
    </div>

    <slot> </slot>

    <div class="h-full flex flex-col items-center justify-center w-20">
      <Icon
        @click="paginate(1)"
        name="octicon:chevron-up-12"
        class="rotate-90 w-20 h-20 text-white hover:text-blue-200 transition"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["paginate"]);

const page = usePage();

function paginate(direction: number) {
  page.value += direction;
  emit("paginate");
}
</script>

<style scoped></style>
