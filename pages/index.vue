<script setup lang="ts">
/**
 * Home Page (`pages/index.vue`) — Route: `/`
 * ------------------------------------------
 * Cleanly composes the modular sections of the landing page.
 * To edit a specific section, jump to its component in `components/home/`
 * or update its content array in `data/`.
 */

useHead({
  title: 'Fawzy',
  link: [
    {
      rel: 'preload',
      href: '/fonts/KoKhalaya-5-5.otf',
      as: 'font',
      type: 'font/otf',
      crossorigin: 'anonymous',
    },
  ],
})
</script>

<template>
  <div>
    <!-- 1. Hero Banner (Headline, Bio, WhatsApp CTA, Portrait) -->
    <HomeHeroSection />

    <!-- 2. +100M Animated Views Counter -->
    <HomeViewsCounterSection />

    <!-- 3. Featured Videos Marquee + Vimeo Lightbox Player -->
    <HomeFeaturedVideoSlider />

    <!-- 4. +1000 Videos, +30 Clients, +06 Countries Highlights -->
    <HomeStatsSection />

    <!-- 5. Infinite Company & Creator Marquees -->
    <HomeClientsMarquee />

    <!-- 6. Services Bento Grid (#my_services) & Contact/YouTube CTAs -->
    <HomeServicesSection />

    <!-- 7. Featured Blog Articles Preview (Nuxt deduplicates `home/HomeBlogSection` -> `HomeBlogSection`) -->
    <HomeBlogSection />
  </div>
</template>
