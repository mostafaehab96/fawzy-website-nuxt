<script setup lang="ts">
/**
 * Reusable Vimeo Portfolio Card (`components/videos/VimeoVideoCard.vue`)
 * ----------------------------------------------------------------------
 * Supports two aspect-ratio variants:
 *   - `short`     -> Vertical 9:16 card (Shorts section)
 *   - `landscape` -> Horizontal 16:9 card (YouTube & Collage sections)
 *
 * Vimeo Fetching:
 *   If `thumbnail` is provided in `data/videos.ts`, it renders immediately.
 *   If `thumbnail` is omitted, `useVimeoOembed()` uses Nuxt's `useFetch` to
 *   automatically pull the cover thumbnail & title from Vimeo's oEmbed API.
 */
import {
  getVimeoEmbedUrl,
  pauseVimeoIframe,
  playVimeoIframe,
  useVimeoOembed,
} from '~/composables/useVimeo'

const props = defineProps<{
  vimeoId: string
  thumbnail?: string
  title?: string
  variant: 'short' | 'landscape'
  isPlaying: boolean
  priority?: boolean
}>()

const emit = defineEmits<{
  play: [vimeoId: string]
}>()

// Fetch Vimeo oEmbed metadata automatically via Nuxt `useFetch` if no local thumbnail was supplied
const { data: oembedData } = useVimeoOembed(
  () => props.vimeoId,
  !props.thumbnail
)

const resolvedThumbnail = computed(
  () => props.thumbnail || oembedData.value?.thumbnail_url || ''
)

const resolvedTitle = computed(
  () => props.title || oembedData.value?.title || 'vimeo-player'
)

const embedUrl = computed(() =>
  getVimeoEmbedUrl(props.vimeoId, { autoplay: true, muted: false })
)

const iframeRef = ref<HTMLIFrameElement | null>(null)
// Lazy-mount the Vimeo `<iframe>` ONLY when clicked so 34 cross-origin iframes
// don't bog down initial page load or cause GPU compositing jank on first scroll
const hasLoadedIframe = ref(false)
const isRevealingPlayer = ref(false)
const isThumbnailHidden = ref(false)
const isBeforeHidden = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | null = null

function revealPlayerSmoothly() {
  if (!props.isPlaying) return
  isRevealingPlayer.value = true
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (props.isPlaying) {
      isThumbnailHidden.value = true
      isBeforeHidden.value = true
    }
  }, 500)
}

function handleThumbnailClick(e: MouseEvent) {
  e.stopPropagation()
  hasLoadedIframe.value = true
  emit('play', props.vimeoId)
}

watch(
  () => props.isPlaying,
  async (playing) => {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }

    if (playing) {
      const wasAlreadyMounted = hasLoadedIframe.value && !!iframeRef.value
      hasLoadedIframe.value = true
      await nextTick()

      if (wasAlreadyMounted) {
        // Iframe was loaded on an earlier click — play & reveal immediately
        revealPlayerSmoothly()
        await playVimeoIframe(iframeRef.value)
      } else {
        // First click: wait until Vimeo player finishes initializing so there's
        // never a flash of empty background before the video frame appears
        await playVimeoIframe(iframeRef.value)
        revealPlayerSmoothly()
      }
    } else {
      isRevealingPlayer.value = false
      isThumbnailHidden.value = false
      isBeforeHidden.value = false
      pauseVimeoIframe(iframeRef.value)
    }
  }
)

onBeforeUnmount(() => {
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <div
    :class="[
      variant === 'short' ? 'card' : 'card_youtube',
      {
        'is-loading': isPlaying && !isRevealingPlayer,
        'hide-before': isRevealingPlayer,
        'before-hidden': isBeforeHidden,
      },
    ]"
    @click.stop
  >
    <div :class="variant === 'short' ? 'iframe_box' : 'iframe_box_youtube'">
      <div
        v-show="!isThumbnailHidden"
        :class="
          variant === 'short'
            ? 'video_thumbnail_box'
            : 'video_thumbnail_box_youtube'
        "
      >
        <img
          v-if="resolvedThumbnail"
          :class="[
            variant === 'short'
              ? 'video_thumbnail_image'
              : 'video_thumbnail_image_youtube',
            { disappear: isRevealingPlayer },
          ]"
          :src="resolvedThumbnail"
          :alt="resolvedTitle"
          :width="variant === 'short' ? 300 : 517"
          :height="variant === 'short' ? 517 : 300"
          :loading="priority ? 'eager' : 'lazy'"
          :fetchpriority="priority ? 'high' : undefined"
          decoding="async"
          @click="handleThumbnailClick"
        />
      </div>

      <iframe
        v-if="hasLoadedIframe"
        ref="iframeRef"
        :title="resolvedTitle"
        :src="embedUrl"
        frameborder="0"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
/* ==========================================================================
   Vimeo Card Styles — Vertical (`short`) & Horizontal (`landscape`)
   Migrated from `videos_page.css`
   ========================================================================== */

.card {
  transition: transform 0.3s ease;
  transform: translateY(0);
  height: 517px;
  width: 300px;
  position: relative;
}

.card_youtube {
  transition: transform 0.3s ease;
  transform: translateY(0);
  height: 300px;
  width: 517px;
  position: relative;
}

.card.is-loading::before,
.card_youtube.is-loading::before {
  border-color: #ffffff transparent #ffffff #c9e8ffa1;
  animation: cardPlaySpin 0.8s linear infinite;
}

@keyframes cardPlaySpin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.card::before,
.card_youtube::before {
  position: absolute;
  content: '\f04b';
  font-family: 'Font Awesome 6 Free', 'Font Awesome 5 Free';
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  left: 50%;
  top: 50%;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%) scale(1);
  color: #ffffff;
  background-color: #0000009a;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
  border: 3px solid #c9e8ffa1;
  transition: all 0.5s ease;
  opacity: 1;
  pointer-events: none;
}

.card.hide-before::before,
.card_youtube.hide-before::before {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.7);
  filter: blur(2px);
}

.card.before-hidden::before,
.card_youtube.before-hidden::before {
  display: none;
  content: none;
}

.iframe_box,
.iframe_box_youtube {
  width: 100%;
  height: 100%;
  border: 10px solid #c9e8ff;
  background-color: #c9e8ff;
  border-radius: 40px;
  overflow: hidden;
  position: relative;
}

.video_thumbnail_image,
.video_thumbnail_image_youtube {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0 auto;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.5s ease;
  opacity: 1;
  transform: scale(1);
  z-index: 1;
}

.video_thumbnail_image.disappear,
.video_thumbnail_image_youtube.disappear {
  opacity: 0;
  transform: scale(0.7);
  filter: blur(2px);
  pointer-events: none;
}

.iframe_box iframe,
.iframe_box_youtube iframe {
  width: 100%;
  height: 100%;
  border-radius: 30px;
}

.card:hover,
.card_youtube:hover {
  transform: translateY(-5px);
}

/* Responsive Breakpoints */
@media (max-width: 1660px) {
  .card_youtube {
    height: 262px;
    width: 450px;
  }
}

@media (max-width: 1465px) {
  .card_youtube {
    height: 235px;
    width: 400px;
  }
}

@media (max-width: 1320px) {
  .card_youtube {
    height: 290px;
    width: 500px;
  }
}

@media (max-width: 1110px) {
  .card_youtube {
    height: 235px;
    width: 400px;
  }
}

@media (max-width: 910px) {
  .card_youtube {
    height: 205px;
    width: 350px;
  }
}

@media (max-width: 800px) {
  .card_youtube {
    height: 290px;
    width: 500px;
  }
}

@media (max-width: 767px) {
  .card {
    height: 600px;
    width: 347px;
  }
}

@media (max-width: 550px) {
  .card_youtube {
    height: 245px;
    width: 420px;
  }
}

@media (max-width: 450px) {
  .card_youtube {
    height: 216px;
    width: 370px;
  }
}
</style>
