<script setup lang="ts">
/**
 * Reusable Video Category Header (`components/videos/VideoSectionHeader.vue`)
 * ---------------------------------------------------------------------------
 * Used across `/videos` for Shorts, YouTube Videos, Collage Art Animation,
 * and Made with AI sections.
 */

defineProps<{
  title: string
  subtitleLine1: string
  subtitleLine2: string
  /** Adds extra top margin on the first section below the fixed header */
  isFirst?: boolean
}>()
</script>

<template>
  <div class="content-header" :class="{ content_header_first: isFirst }">
    <div class="image_box">
      <img src="/images/a3maly_bg_shape.svg" alt="" />
    </div>
    <h2>{{ title }}</h2>
    <p>
      {{ subtitleLine1 }}<br />
      {{ subtitleLine2 }}
    </p>
  </div>
</template>

<style scoped>
.content-header {
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  position: relative;
}

.content_header_first {
  margin-top: 220px;
}

.image_box {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: -1;
}

.image_box img {
  width: 450px;
}

.content-header h2 {
  font-size: 3rem;
  color: #0c00b5;
  margin-bottom: 0;
}

.content-header p {
  color: #686868;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.6;
}

@media (max-width: 767px) {
  .content_header_first {
    margin-top: 150px;
  }

  .image_box {
    top: 60%;
  }

  .image_box img {
    width: 300px;
  }

  .content-header h2 {
    font-size: 2rem;
    margin-bottom: -5px;
  }

  .content-header p {
    font-size: 1.1rem;
  }
}
</style>
