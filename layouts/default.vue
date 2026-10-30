<script setup lang="ts">
/**
 * Default Application Layout (`layouts/default.vue`)
 * --------------------------------------------------
 * Wraps all pages (`pages/index.vue`, `pages/videos.vue`, `pages/blog/index.vue`)
 * with the persistent top navigation bar, main page slot, footer, and
 * floating scroll-to-top button.
 */
import { useAos } from '~/composables/useAos'

// Initialize AOS (Animate On Scroll) across the layout
useAos()
</script>

<template>
  <div class="layout-wrapper">
    <LayoutScrollToTop />
    <LayoutAppHeader />

    <main class="layout-main">
      <slot />
    </main>

    <LayoutAppFooter />
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-main {
  flex: 1;
}
</style>
