<script setup>
import { RouterLink } from "vue-router";

defineProps({
  to: {
    type: String,
  },
});
</script>
<template>
  <RouterLink
    :to="{ name: to }"
    class="text-lg text-white font-semibold bg-green-600 px-6 py-2 rounded-md"
  >
    <slot></slot>
  </RouterLink>
</template>
