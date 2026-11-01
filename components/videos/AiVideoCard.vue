<script setup lang="ts">
/**
 * Local AI Showcase Video Card (`components/videos/AiVideoCard.vue`)
 * ------------------------------------------------------------------
 * Renders muted, auto-looping MP4 clips for the "Made with Ai" section
 * in either vertical (`short`) or horizontal (`landscape`) frame sizes.
 */

const props = defineProps<{
  videoSrc: string
  variant: 'short' | 'landscape'
}>()

const cardRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const activeSrc = ref<string | undefined>(undefined)
let observer: IntersectionObserver | null = null
let isIntersectingNow = false

// Attach and play AI MP4 clips only when near the viewport so initial page
// loads on `/videos` don't eagerly fetch offscreen video streams
onMounted(async () => {
  if (!cardRef.value || !('IntersectionObserver' in window)) {
    activeSrc.value = props.videoSrc
    await nextTick()
    videoRef.value?.play().catch(() => {})
    return
  }

  observer = new IntersectionObserver(
    async (entries) => {
      const entry = entries[0]
      if (!entry) return
      isIntersectingNow = entry.isIntersecting

      if (entry.isIntersecting) {
        if (!activeSrc.value) {
          activeSrc.value = props.videoSrc
          await nextTick()
          videoRef.value?.load()
        }
        if (isIntersectingNow) {
          videoRef.value?.play().catch(() => {})
        }
      } else {
        videoRef.value?.pause()
      }
    },
    { rootMargin: '400px 0px' }
  )

  observer.observe(cardRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="cardRef"
    :class="variant === 'short' ? 'Ai_card_shorts' : 'Ai_card_youtube'"
  >
    <div
      :class="
        variant === 'short' ? 'video_ai_shorts_box' : 'video_ai_youtube_box'
      "
    >
      <video
        ref="videoRef"
        :src="activeSrc"
        muted
        loop
        playsinline
        preload="none"
      ></video>
    </div>
  </div>
</template>

<style scoped>
.Ai_card_shorts {
  transition: all 0.3s ease;
  transform: translateY(0);
  height: 550px;
  width: 325px;
  position: relative;
}

.video_ai_shorts_box,
.video_ai_youtube_box {
  width: 100%;
  height: 100%;
  border: 3px solid #c9e8ff;
  background-color: #c9e8ff;
  border-radius: 40px;
  overflow: hidden;
  position: relative;
}

.video_ai_shorts_box video,
.video_ai_youtube_box video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 10px solid #c9e8ff;
  background-color: #c9e8ff;
  border-radius: 50px;
  overflow: hidden;
  position: relative;
}

.Ai_card_youtube {
  transition: all 0.3s ease;
  transform: translateY(0);
  height: 258px;
  width: 440px;
  position: relative;
}

@media (max-width: 480px) {
  .Ai_card_youtube {
    height: 248px;
    width: 420px;
  }
}

@media (max-width: 460px) {
  .Ai_card_youtube {
    height: 225px;
    width: 380px;
  }
}

@media (max-width: 410px) {
  .Ai_card_youtube {
    height: 205px;
    width: 340px;
  }
}
</style>
