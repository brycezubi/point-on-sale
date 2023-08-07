<script setup>
  import {RouterLink} from 'vue-router'
</script>
<template>
  <RouterLink
    :to="{ name: 'shop' }"
    class="text-white text-2xl font-semibold"
    >POS <span class="text-green-400">VUE</span></RouterLink
  >
</template>
