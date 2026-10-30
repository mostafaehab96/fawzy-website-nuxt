<script setup lang="ts">
/**
 * Root Application Component (`app.vue`).
 * Wraps every page inside `layouts/default.vue` via <NuxtLayout>
 * and renders the active route component from `pages/` via <NuxtPage />.
 */
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
