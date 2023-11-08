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
    <Transition
      enter-active-class="opacity-0 transition ease-in-out duration-500 transform"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="opacity-100 transition ease-in-out duration-500 transform"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <slot> </slot>
    </Transition>
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
  emit("paginate", page.value);
}
</script>

<style scoped></style>
