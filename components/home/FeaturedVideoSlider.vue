<script setup lang="ts">
/**
 * Featured Videos Marquee & Vimeo Lightbox (`components/home/FeaturedVideoSlider.vue`)
 * ------------------------------------------------------------------------------------
 * Migrated & modernized from `video_thumb.js` + `video_thum_loader.js`:
 *   1. Renders two identical infinite-scrolling tracks via Vue `v-for` (no DOM cloning).
 *   2. Uses `IntersectionObserver` to auto-play visible MP4 teasers and pause off-screen ones.
 *   3. Clicking any slide pauses the marquee, fetches Vimeo metadata via `$fetch`
 *      (`fetchVimeoOembed`), and opens a centered Vimeo player via `<Teleport to="body">`.
 *
 * Add or reorder featured videos in `data/videos.ts` (`featuredSliderVideos`).
 */
import { fetchVimeoOembed, getVimeoEmbedUrl } from '~/composables/useVimeo'
import { featuredSliderVideos, type FeaturedSliderVideo } from '~/data/videos'

const sliderRootRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const shouldLoadVideos = ref(false)
const activeSlide = ref<FeaturedSliderVideo | null>(null)
const activeTitle = ref('Vimeo Featured Video')

// Track loading/error states per video teaser URL
const loadedVideos = reactive<Record<string, boolean>>({})
const failedVideos = reactive<Record<string, boolean>>({})

const isPaused = computed(() => isHovered.value || activeSlide.value !== null)

function markLoaded(src: string) {
  loadedVideos[src] = true
}

function markFailed(src: string) {
  failedVideos[src] = true
}

async function openVideoModal(slide: FeaturedSliderVideo) {
  activeSlide.value = slide
  activeTitle.value = 'Vimeo Featured Video'

  // Fetch Vimeo video metadata cleanly using Nuxt's `$fetch` helper
  const meta = await fetchVimeoOembed(slide.vimeoId)
  if (meta?.title) {
    activeTitle.value = meta.title
  }
}

function closeVideoModal() {
  activeSlide.value = null
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && activeSlide.value) {
    closeVideoModal()
  }
}

// Lazily attach teaser MP4 sources near the viewport and auto-play visible slides
let sectionObserver: IntersectionObserver | null = null
let videoObserver: IntersectionObserver | null = null

function startVideoPlaybackObserver() {
  if (!sliderRootRef.value || videoObserver) return

  videoObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target.querySelector('video')
        if (!video) continue

        if (entry.isIntersecting && !activeSlide.value) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      }
    },
    { root: null, threshold: 0.001 }
  )

  const slides = sliderRootRef.value.querySelectorAll('.slide_video_slider')
  slides.forEach((slideEl) => {
    const videoEl = slideEl.querySelector('video')
    if (videoEl) {
      if (videoEl.readyState >= 3) {
        const src = videoEl.getAttribute('data-src')
        if (src) markLoaded(src)
      }
      videoObserver?.observe(slideEl)
    }
  })
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)

  if (!sliderRootRef.value) return

  if (!('IntersectionObserver' in window)) {
    shouldLoadVideos.value = true
    await nextTick()
    startVideoPlaybackObserver()
    return
  }

  sectionObserver = new IntersectionObserver(
    async (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        shouldLoadVideos.value = true
        sectionObserver?.disconnect()
        sectionObserver = null
        await nextTick()
        startVideoPlaybackObserver()
      }
    },
    { rootMargin: '500px 0px' }
  )
  sectionObserver.observe(sliderRootRef.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  sectionObserver?.disconnect()
  videoObserver?.disconnect()
})
</script>

<template>
  <div
    ref="sliderRootRef"
    class="featured-video-root"
    :style="{ '--total-slides_video_slider': featuredSliderVideos.length }"
  >
    <!-- Section Heading -->
    <section class="a3maly_box">
      <div class="container">
        <div class="a3maly_head_box">
          <h2 class="a3maly_head">أعمــــالي المميــزة</h2>
          <h3 class="a3maly_sub_head">
            فيديـــــــــــــوهات مختــــــــــــــــــــارة
          </h3>
          <img
            class="a3maly_shape"
            src="/images/a3maly_bg_shape.svg"
            width="560"
            height="146"
            loading="lazy"
            decoding="async"
            alt=""
          />
          <NuxtLink class="more_shorts" to="/videos#Shorts">
            شاهد المزيد من أعمالي
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Blue Grid Backdrop -->
    <div class="a3maly_videos_box_video_slider">
      <div class="net_background_video_slider"></div>
    </div>

    <!-- Dual-Track Infinite Video Teaser Carousel -->
    <div class="all_video_box_video_slider">
      <div
        class="carousel_video_slider"
        role="region"
        aria-label="Video Carousel"
      >
        <div
          v-for="trackIndex in [1, 2]"
          :key="trackIndex"
          class="carousel-track_video_slider"
          :class="{ paused_video_slider: isPaused }"
          :aria-hidden="trackIndex === 2 ? 'true' : undefined"
        >
          <div
            v-for="slide in featuredSliderVideos"
            :key="`${trackIndex}-${slide.vimeoId}`"
            class="slide_video_slider"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
            @click.stop="openVideoModal(slide)"
          >
            <!-- Film-Reel Loading Spinner -->
            <div
              v-if="shouldLoadVideos && !loadedVideos[slide.teaserSrc]"
              class="video_loader"
            >
              <span v-if="failedVideos[slide.teaserSrc]" class="loader-error">
                Failed to load video
              </span>
              <div v-else class="film-reel-spinner">
                <div class="reel"></div>
                <div class="reel-hole hole1"></div>
                <div class="reel-hole hole2"></div>
                <div class="reel-hole hole3"></div>
                <div class="reel-hole hole4"></div>
              </div>
            </div>

            <video
              class="video_thumbnail_video_slider"
              :data-src="slide.teaserSrc"
              :src="shouldLoadVideos ? slide.teaserSrc : undefined"
              :poster="shouldLoadVideos ? slide.poster : undefined"
              loop
              muted
              playsinline
              preload="none"
              @loadeddata="markLoaded(slide.teaserSrc)"
              @canplaythrough="markLoaded(slide.teaserSrc)"
              @error="markFailed(slide.teaserSrc)"
            ></video>
          </div>
        </div>
      </div>
    </div>

    <!-- Centered Vimeo Lightbox Modal (teleported cleanly to <body>) -->
    <Teleport to="body">
      <div
        class="overlay_video_slider"
        :class="{ active_video_slider: activeSlide !== null }"
        @click="closeVideoModal"
      ></div>

      <div
        v-if="activeSlide"
        class="slide_video_slider centered_video_slider"
        @click.stop
      >
        <iframe
          class="vd_thumb_video_slider"
          :title="activeTitle"
          :src="getVimeoEmbedUrl(activeSlide.vimeoId, { autoplay: true })"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* ==========================================================================
   Featured Videos Slider Styles (migrated from `home.css` lines 2074–2348 & 5126–5278)
   Note: CSS custom properties are scoped to `.featured-video-root` rather than
   `:root` so Vue scoped CSS resolves them cleanly at every breakpoint.
   ========================================================================== */

.featured-video-root {
  --gap-width_video_slider: 200px;
  --slide-width_video_slider: 300px;
  --slide-height_video_slider: 514px;
  --scroll-duration_video_slider: 35s;
  --content-width_video_slider: calc(
    (var(--total-slides_video_slider) * var(--slide-width_video_slider)) +
      ((var(--total-slides_video_slider) - 1) * var(--gap-width_video_slider))
  );
  --track-width_video_slider: calc(
    var(--content-width_video_slider) + 1 * var(--gap-width_video_slider)
  );
}

.a3maly_box {
  direction: rtl;
  margin-bottom: 100px;
}

.a3maly_head_box {
  display: block;
  margin: 0 auto 150px;
  width: fit-content;
  position: relative;
}

.a3maly_head {
  font-weight: 700;
  font-size: 91px;
  line-height: 136px;
  text-align: right;
  color: #0618c4;
  transform: rotate(-1.99deg);
  z-index: 5;
}

.a3maly_sub_head {
  font-style: normal;
  font-weight: 300;
  font-size: 38px;
  line-height: 61px;
  text-align: center;
  color: #000000;
  z-index: 5;
}

.a3maly_shape {
  position: absolute;
  z-index: -1;
  width: 630px;
  height: auto;
  top: 37px;
  right: 50%;
  transform: translateX(50%);
}

.more_shorts {
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  padding: 10px 40px;
  border-radius: 78px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  top: 240px;
  background: linear-gradient(120deg, #262d5c, #443ac9, #262d5c);
  background-size: 200% 100%;
  background-position: 100% 0;
  transition: background-position 0.3s;
  animation: gradientAnimation 1s infinite alternate;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

.more_shorts::before {
  content: '';
  position: absolute;
  width: 110%;
  height: 59.47px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid #c9e8ff;
  border-radius: 40px;
  padding: 5px 8px;
  pointer-events: none;
}

.more_shorts:hover::before {
  border: 3px solid #1027f1;
  transition: 0.4s;
}

@media screen and (max-width: 1400px) {
  .a3maly_head {
    font-size: 60px;
    line-height: 136px;
  }
  .a3maly_sub_head {
    font-size: 30px;
    line-height: 5px;
  }
  .a3maly_shape {
    width: 500px;
  }
  .more_shorts {
    font-size: 17px;
    top: 200px;
  }
}

@media screen and (max-width: 800px) {
  .a3maly_box {
    margin-top: -20px;
  }
  .a3maly_head {
    font-size: 35px;
    line-height: 100px;
  }
  .a3maly_sub_head {
    font-size: 20px;
    line-height: 10px;
  }
  .a3maly_shape {
    width: 330px;
  }
  .more_shorts {
    font-size: 17px;
    top: 170px;
  }
  .more_shorts::before {
    height: 55px;
    padding: 5px 3px;
  }
}

@media screen and (max-width: 500px) {
  .a3maly_box {
    margin-top: -75px;
  }
  .a3maly_head {
    font-size: 30px;
    line-height: 100px;
  }
  .a3maly_sub_head {
    font-size: 18px;
    margin-top: -11px !important;
  }
  .a3maly_shape {
    width: 280px;
  }
}

/* Video Slider Track & Backdrop */
.a3maly_videos_box_video_slider {
  width: 100%;
  height: 575px;
  margin-top: 110px;
  background: #0618c4;
  position: relative;
  z-index: -2;
  margin-bottom: 100px;
}

.net_background_video_slider {
  position: absolute;
  width: 100%;
  height: 726px;
  bottom: 0;
  right: 0;
  background-color: transparent;
  background-image:
    linear-gradient(0deg, hsla(206, 100%, 79%, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, hsla(206, 100%, 79%, 0.5) 1px, transparent 1px);
  background-size: 35px 35px;
  z-index: -1;
}

.all_video_box_video_slider {
  position: relative;
}

.carousel_video_slider {
  overflow: hidden;
  width: 100%;
  position: absolute;
  top: -735px;
  display: flex;
  flex-wrap: nowrap;
}

.carousel-track_video_slider {
  display: flex;
  gap: var(--gap-width_video_slider);
  position: relative;
  flex-shrink: 0;
  min-width: var(--track-width_video_slider);
  animation: scroll_video_slider var(--scroll-duration_video_slider) linear
    infinite;
  will-change: transform;
  transition: transform 0.5s ease-in-out;
}

.carousel-track_video_slider.paused_video_slider {
  animation-play-state: paused !important;
}

@keyframes scroll_video_slider {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(
      calc(
        -1 * var(--content-width_video_slider) - 1 *
          var(--gap-width_video_slider)
      )
    );
  }
}

.slide_video_slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 var(--slide-width_video_slider);
  height: var(--slide-height_video_slider);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s ease;
  z-index: 1;
  background: #c9e8ff;
  border: 12px solid #c9e8ff;
  border-radius: 30px;
  margin-top: 90px;
}

.slide_video_slider:hover {
  transform: translateY(-90px);
}

.video_thumbnail_video_slider {
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: inset(0 round 40px);
  z-index: 2;
}

/* Film-Reel Spinner */
.video_loader {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  gap: 10px;
  border-radius: 18px;
}

.loader-error {
  color: #ff6b6b;
  font-size: 14px;
  padding: 0 12px;
  text-align: center;
}

.film-reel-spinner {
  position: relative;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at center, #0c00b5 20%, #0c00b5 80%);
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.reel-hole {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #000;
  border-radius: 50%;
}

.hole1 {
  top: 5px;
  left: 25px;
}
.hole2 {
  top: 25px;
  left: 5px;
}
.hole3 {
  top: 25px;
  right: 5px;
}
.hole4 {
  bottom: 5px;
  left: 25px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Teleported Modal Styles */
.overlay_video_slider {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.overlay_video_slider.active_video_slider {
  opacity: 1;
  visibility: visible;
}

.slide_video_slider.centered_video_slider {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  margin-top: 0 !important;
  transform: translate(-50%, -50%) !important;
  z-index: 10001 !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.5s ease-in-out !important;
  width: 390px !important;
  height: 678px !important;
}

.slide_video_slider.centered_video_slider:hover {
  transform: translate(-50%, -50%) !important;
}

.vd_thumb_video_slider {
  width: 100%;
  height: 100%;
  clip-path: inset(0 round 18px);
  background: #000000;
}

@media screen and (max-width: 767px) {
  .featured-video-root {
    --gap-width_video_slider: 90px;
    --slide-width_video_slider: 260px;
    --slide-height_video_slider: 440px;
  }

  .carousel_video_slider {
    top: -700px;
  }

  .slide_video_slider.centered_video_slider {
    width: 360px !important;
    height: 625px !important;
  }
}
</style>
