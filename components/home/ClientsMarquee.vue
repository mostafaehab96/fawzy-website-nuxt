<script setup lang="ts">
/**
 * Clients & Content Creators Marquee (`components/home/ClientsMarquee.vue`)
 * -------------------------------------------------------------------------
 * Renders the "أبرز عملائي" header + two infinite horizontal marquee rows:
 *   - Row 1 (`companyLogos`): Scrolls leftward with grayscale brand logos
 *   - Row 2 (`creatorAvatars`): Scrolls rightward with circular creator portraits
 *
 * Replaces `company_logo.js` & `creator_logo.js` DOM-cloning scripts with
 * clean declarative `v-for="trackIndex in [1, 2]"`.
 *
 * Edit logos or creator images in `data/clients.ts`.
 */
import { companyLogos, creatorAvatars } from '~/data/clients'

const marqueeRootRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!marqueeRootRef.value || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      isVisible.value = entries.some((entry) => entry.isIntersecting)
    },
    { rootMargin: '250px 0px' }
  )
  observer.observe(marqueeRootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="marqueeRootRef"
    class="clients-marquee-root"
    :class="{ 'marquee-paused': !isVisible }"
    :style="{
      '--total-slides_logos': companyLogos.length,
      '--total-slides_logos_left': creatorAvatars.length,
    }"
  >
    <!-- Section Heading -->
    <section class="omlaay_head_cont">
      <div class="container">
        <div class="omlaay_head_box">
          <h2 class="omlaay_head">أبـــرز عمـــــــلائي</h2>
          <h3 class="omlaay_sub_head">
            <span class="emoj_hand">
              <img
                class="emoj_hand_img"
                src="/images/emoj_hand.svg"
                width="49"
                height="50"
                loading="lazy"
                decoding="async"
                alt=""
              />
            </span>
            المؤسســات وصناع المحتوى
          </h3>
          <img
            class="omlaay_shape"
            src="/images/a3maly_bg_shape.svg"
            width="560"
            height="146"
            loading="lazy"
            decoding="async"
            alt=""
          />
        </div>
      </div>
    </section>

    <!-- Subtle Grid Backdrop -->
    <div class="omlaay_box">
      <div class="omlaay_net_background"></div>
    </div>

    <!-- Row 1: Company Logos Marquee -->
    <div class="all_omlaa_logos_box">
      <div
        class="logos_carousel"
        role="region"
        aria-label="Company Logos"
      >
        <div
          v-for="trackIndex in [1, 2]"
          :key="`comp-track-${trackIndex}`"
          class="logos_carousel-track"
          :aria-hidden="trackIndex === 2 ? 'true' : undefined"
        >
          <div
            v-for="logo in companyLogos"
            :key="`${trackIndex}-${logo.src}`"
            class="logos_slide"
          >
            <img
              :class="['logos_img_comp', logo.className]"
              :src="logo.src"
              :alt="logo.alt"
              width="300"
              height="150"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Row 2: Content Creators Marquee (reverse scroll direction) -->
    <div class="all_omlaa_logos_box_left">
      <div
        class="logos_carousel_left"
        role="region"
        aria-label="Content Creators"
      >
        <div
          v-for="trackIndex in [1, 2]"
          :key="`creator-track-${trackIndex}`"
          class="logos_carousel-track_left"
          :aria-hidden="trackIndex === 2 ? 'true' : undefined"
        >
          <div
            v-for="creator in creatorAvatars"
            :key="`${trackIndex}-${creator.src}`"
            class="logos_slide_left"
          >
            <div class="logos_img_wrapper">
              <img
                class="logos_img"
                :src="creator.src"
                :alt="creator.alt"
                width="200"
                height="200"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==========================================================================
   Clients Marquee Styles (migrated from `home.css` lines 3187–3706)
   ========================================================================== */

.clients-marquee-root {
  --gap-width_logos: 150px;
  --slide-width_logos: 300px;
  --scroll-duration_logos: 50s;
  --content-width_logos: calc(
    (var(--total-slides_logos) * var(--slide-width_logos)) +
      ((var(--total-slides_logos) - 1) * var(--gap-width_logos))
  );
  --track-width: calc(var(--content-width_logos) + var(--gap-width_logos));

  --gap-width_logos_left: 160px;
  --slide-width_logos_left: 200px;
  --scroll-duration_logos_left: 50s;
  --content-width_logos_left: calc(
    (var(--total-slides_logos_left) * var(--slide-width_logos_left)) +
      ((var(--total-slides_logos_left) - 1) * var(--gap-width_logos_left))
  );
  --track-width_logos_left: calc(
    var(--content-width_logos_left) + 1 * var(--gap-width_logos_left)
  );
}

.omlaay_head_cont {
  direction: rtl;
  margin-bottom: 100px;
}

.omlaay_head_box {
  display: block;
  margin: 0 auto;
  width: fit-content;
  position: relative;
}

.omlaay_head {
  font-weight: 700;
  font-size: 78px;
  line-height: 136px;
  text-align: right;
  color: #0618c4;
  transform: rotate(-1.99deg);
  z-index: 5;
}

.omlaay_sub_head {
  font-style: normal;
  font-weight: 300;
  font-size: 32px;
  line-height: 61px;
  text-align: right;
  color: #000000;
  direction: ltr;
  position: relative;
  margin-top: 10px;
}

.emoj_hand {
  position: absolute;
  left: 20px;
  top: 0;
}

.omlaay_shape {
  position: absolute;
  z-index: -1;
  width: 630px;
  height: auto;
  top: 45px;
  right: 50%;
  transform: translateX(50%);
}

@media screen and (max-width: 1400px) {
  .omlaay_head_cont {
    margin-bottom: 60px;
    margin-top: -50px;
  }
  .omlaay_head {
    font-size: 65px;
  }
  .omlaay_sub_head {
    font-size: 25px;
    margin-top: -15px;
  }
  .emoj_hand {
    left: 37px;
    top: 7px;
  }
  .emoj_hand_img {
    width: 35px;
    height: 36px;
  }
  .omlaay_shape {
    width: 450px;
    top: 60px;
  }
}

@media screen and (max-width: 800px) {
  .omlaay_head_cont {
    margin-bottom: 40px;
    margin-top: -65px;
  }
  .omlaay_head {
    font-size: 47px;
  }
  .omlaay_sub_head {
    font-size: 18px;
    margin-top: -45px;
  }
  .emoj_hand {
    left: 32px;
    top: 5px;
  }
  .emoj_hand_img {
    width: 24px;
    height: 25px;
  }
  .omlaay_shape {
    width: 300px;
    top: 58px;
  }
}

@media screen and (max-width: 500px) {
  .omlaay_head_cont {
    margin-bottom: 40px;
    margin-top: 20px;
  }
  .omlaay_head {
    font-size: 35px;
  }
  .omlaay_sub_head {
    font-size: 13px;
    margin-top: -55px;
  }
  .emoj_hand {
    left: 22px;
    top: 5px;
  }
  .emoj_hand_img {
    width: 22px;
    height: 23px;
  }
  .omlaay_shape {
    width: 250px;
    top: 58px;
  }
}

/* Grid Background */
.omlaay_box {
  width: 100%;
  height: 400px;
  margin-top: 180px;
  position: relative;
  z-index: -2;
}

.omlaay_net_background {
  position: absolute;
  width: 100%;
  height: 580px;
  top: -180px;
  right: 0;
  background-color: transparent;
  background-image:
    linear-gradient(0deg, hsla(206, 100%, 79%, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, hsla(206, 100%, 79%, 0.5) 1px, transparent 1px);
  background-size: 25px 25px;
  z-index: -1;
}

@media screen and (max-width: 800px) {
  .omlaay_box {
    height: 400px;
    margin-top: 120px;
  }
  .omlaay_net_background {
    height: 520px;
    top: -120px;
  }
}

@media screen and (max-width: 500px) {
  .omlaay_box {
    height: 400px;
    margin-top: 170px;
  }
  .omlaay_net_background {
    height: 480px;
    top: -160px;
  }
}

/* Row 1: Company Logos */
.all_omlaa_logos_box {
  position: relative;
  width: 100%;
}

.logos_carousel {
  overflow: hidden;
  width: 100%;
  position: absolute;
  top: -670px;
  display: flex;
  flex-wrap: nowrap;
}

.logos_carousel-track {
  display: flex;
  gap: var(--gap-width_logos);
  flex-shrink: 0;
  min-width: var(--track-width);
  animation: scroll_logo var(--scroll-duration_logos) linear infinite;
  will-change: transform;
}

.marquee-paused .logos_carousel-track,
.marquee-paused .logos_carousel-track_left {
  animation-play-state: paused;
}

.logos_slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 var(--slide-width_logos);
  position: relative;
  overflow: visible;
  transition: 0.3s ease;
  margin-top: 90px;
}

.logos_img_comp {
  filter: grayscale(100%);
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.akhdar_img {
  width: 250px;
  height: 85px;
}
.ethad_img {
  width: 300px;
  height: 300px;
}
.KimCam_img {
  width: 250px;
  height: 153px;
  filter: invert(60%);
}
.Soor_img {
  width: 250px;
  height: 73px;
  filter: invert(50%);
}
.gahezia_img {
  width: 300px;
  height: 96px;
}
.had_img {
  width: 300px;
  height: 83px;
}
.qasem_img {
  width: 300px;
  height: 89px;
}
.shorta_img {
  width: 180px;
  height: 184px;
}
.lifestyle_img {
  width: 330px;
  height: 330px;
}

@keyframes scroll_logo {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(
      calc(-1 * var(--content-width_logos) - 1 * var(--gap-width_logos))
    );
  }
}

/* Row 2: Creators */
.all_omlaa_logos_box_left {
  position: relative;
  width: 100%;
}

.logos_carousel_left {
  overflow: hidden;
  width: 100%;
  position: absolute;
  top: -360px;
  display: flex;
  flex-wrap: nowrap;
}

.logos_carousel-track_left {
  display: flex;
  gap: var(--gap-width_logos_left);
  position: relative;
  flex-shrink: 0;
  min-width: var(--track-width_logos_left);
  animation: scroll_logo_left var(--scroll-duration_logos_left) linear infinite;
  will-change: transform;
}

.logos_slide_left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 var(--slide-width_logos_left);
  position: relative;
  transition: 0.3s ease;
  z-index: 55;
  margin-top: 90px;
}

.logos_img_wrapper {
  width: var(--slide-width_logos_left);
  height: var(--slide-width_logos_left);
  border: 3px solid #0618c4;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logos_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes scroll_logo_left {
  0% {
    transform: translateX(
      calc(
        -1 * var(--content-width_logos_left) - 1 * var(--gap-width_logos_left)
      )
    );
  }
  100% {
    transform: translateX(0);
  }
}

@media screen and (max-width: 767px) {
  .clients-marquee-root {
    --gap-width_logos: 20px;
    --slide-width_logos: 200px;
    --gap-width_logos_left: 100px;
    --slide-width_logos_left: 150px;
  }

  .logos_carousel {
    top: -620px;
  }

  .logos_carousel_left {
    top: -400px;
  }

  .akhdar_img {
    width: 150px;
    height: 50px;
  }
  .ethad_img {
    width: 180px;
    height: 180px;
  }
  .KimCam_img {
    width: 150px;
    height: 73px;
  }
  .Soor_img {
    width: 150px;
    height: 44px;
  }
  .gahezia_img {
    width: 190px;
    height: 61px;
  }
  .had_img {
    width: 195px;
    height: 54px;
  }
  .qasem_img {
    width: 150px;
    height: 45px;
  }
  .shorta_img {
    width: 150px;
    height: 153px;
  }
  .lifestyle_img {
    width: 200px;
    height: 200px;
  }
}
</style>
