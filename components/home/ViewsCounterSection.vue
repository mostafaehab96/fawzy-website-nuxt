<script setup lang="ts">
/**
 * Views Counter Section (`components/home/ViewsCounterSection.vue`)
 * -----------------------------------------------------------------
 * Displays the animated "+100,000,000 إجمالي عدد المشاهدات" banner.
 * Uses a native Vue `IntersectionObserver` to trigger the count-up
 * animation once scrolled into view (migrated from `hoom.js`).
 */
import { SITE_CONFIG } from '~/data/site'

const counterRef = ref<HTMLElement | null>(null)
const displayCount = ref('0')
let observer: IntersectionObserver | null = null
let rafId: number | null = null

function animateCountUp(target: number, duration: number) {
  const startTime = performance.now()
  let slowTailStarted = 0
  let tailStartValue = 0

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    let currentValue: number
    if (progress < 0.97) {
      const easedProgress = 1 - Math.pow(2, -10 * progress)
      currentValue = Math.floor(easedProgress * target)
      tailStartValue = currentValue
    } else {
      if (!slowTailStarted) slowTailStarted = currentTime
      const tailProgress = Math.min((currentTime - slowTailStarted) / 700, 1)
      const easedTail = tailProgress * tailProgress
      currentValue = Math.floor(
        tailStartValue + (target - tailStartValue) * easedTail
      )
    }

    if (currentValue < target) {
      displayCount.value = currentValue.toLocaleString('en-US')
      rafId = requestAnimationFrame(update)
    } else {
      displayCount.value = target.toLocaleString('en-US')
    }
  }

  rafId = requestAnimationFrame(update)
}

onMounted(() => {
  if (!counterRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animateCountUp(SITE_CONFIG.totalViewsCount, 1000)
          observer?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.9 }
  )

  observer.observe(counterRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <section class="views_number_section">
    <img
      class="wave"
      src="/images/wave.svg"
      width="1080"
      height="149"
      loading="lazy"
      decoding="async"
      alt=""
    />
    <img
      class="wave_2"
      src="/images/wave.svg"
      width="1080"
      height="149"
      loading="lazy"
      decoding="async"
      alt=""
    />
    <img
      class="wave_3"
      src="/images/wave.svg"
      width="1080"
      height="149"
      loading="lazy"
      decoding="async"
      alt=""
    />
    <img
      class="right_star"
      src="/images/right_star_1.svg"
      width="401"
      height="487"
      loading="lazy"
      decoding="async"
      alt=""
    />
    <img
      class="right_star_rocket"
      data-aos="fade-up"
      data-aos-offset="1"
      src="/images/rocket.webp"
      width="290"
      height="257"
      loading="lazy"
      decoding="async"
      alt=""
    />
    <img
      class="left_star"
      src="/images/left_star_1.svg"
      width="401"
      height="487"
      loading="lazy"
      decoding="async"
      alt=""
    />
    <img
      class="left_star_rocket"
      data-aos="fade-up"
      data-aos-offset="1"
      src="/images/rocket.webp"
      width="290"
      height="257"
      loading="lazy"
      decoding="async"
      alt=""
    />

    <span ref="counterRef" class="views_count plus odometer2">
      {{ displayCount }}
    </span>
    <span class="views_text">إجمالي عدد المشاهدات</span>
  </section>
</template>

<style scoped>
/* ==========================================================================
   Views Counter Styles (migrated from `home.css` lines 1374–2069)
   ========================================================================== */

.views_number_section {
  margin-top: 300px;
  margin-bottom: 150px;
  position: relative;
  min-height: 220px;
}

.wave {
  width: 100%;
  height: 200%;
  position: absolute;
  top: 0;
}

.wave_2 {
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
}

.wave_3 {
  width: 100%;
  height: auto;
  position: absolute;
  top: 65px;
}

.right_star {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.right_star_rocket {
  position: absolute;
  right: 0;
  bottom: 50px;
  width: 380px;
  height: 337px;
}

.left_star {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.left_star_rocket {
  position: absolute;
  left: 0;
  bottom: 50px;
  width: 380px;
  height: 337px;
  scale: -1 1;
}

.views_count {
  position: absolute;
  top: -120px;
  left: 52%;
  transform: translateX(-50%);
  margin-inline: auto;
  width: fit-content;
  font-weight: bold;
  font-size: 150px;
  color: #0618c4;
  filter: drop-shadow(0px 13px 0px #94d1ff);
  white-space: nowrap;
}

.odometer2 {
  text-align: center;
  display: inline-block;
  letter-spacing: 2px;
}

@media (min-width: 1550px) {
  .odometer2 {
    letter-spacing: 12px;
  }
}

.plus {
  position: relative;
}

.plus::after {
  content: '+';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -100px;
  font-size: 170px;
}

.views_text {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: 60px;
  color: #2e3aaf;
  white-space: nowrap;
}

@media (min-width: 1400px) and (max-width: 1900px) {
  .right_star,
  .left_star {
    bottom: 30px;
    width: 321px;
    height: 390px;
  }
  .right_star_rocket,
  .left_star_rocket {
    bottom: 30px;
    width: 320px;
    height: 284px;
  }
  .views_count {
    top: -90px;
    font-size: 130px;
  }
  .plus::after {
    left: -100px;
    font-size: 130px;
  }
  .views_text {
    font-size: 55px;
  }
}

@media (min-width: 1200px) and (max-width: 1400px) {
  .wave {
    top: 10px;
  }
  .right_star,
  .left_star {
    bottom: 20px;
    width: 290px;
    height: 352px;
  }
  .right_star_rocket,
  .left_star_rocket {
    bottom: 20px;
    width: 290px;
    height: 257px;
  }
  .views_count {
    top: -85px;
    font-size: 100px;
    filter: drop-shadow(0px 11px 0px #94d1ff);
  }
  .plus::after {
    left: -70px;
    font-size: 100px;
  }
  .views_text {
    bottom: 0;
    font-size: 35px;
  }
}

@media (min-width: 1000px) and (max-width: 1200px) {
  .wave {
    top: 10px;
  }
  .right_star,
  .left_star {
    bottom: -20px;
    width: 290px;
    height: 352px;
  }
  .right_star_rocket,
  .left_star_rocket {
    bottom: 0;
    width: 260px;
    height: 231px;
  }
}

@media (min-width: 1100px) and (max-width: 1200px) {
  .views_count {
    top: -75px;
    font-size: 85px;
    filter: drop-shadow(0px 10px 0px #94d1ff);
  }
  .plus::after {
    left: -50px;
    font-size: 85px;
  }
  .views_text {
    bottom: 0;
    font-size: 30px;
  }
}

@media (min-width: 1000px) and (max-width: 1100px) {
  .views_count {
    top: -72px;
    font-size: 75px;
    filter: drop-shadow(0px 8px 0px #94d1ff);
  }
  .plus::after {
    left: -55px;
    font-size: 75px;
  }
  .views_text {
    bottom: 0;
    font-size: 30px;
  }
}

@media (min-width: 800px) and (max-width: 1000px) {
  .right_star,
  .left_star {
    bottom: -20px;
    width: 245px;
    height: 298px;
  }
  .right_star_rocket {
    bottom: 0;
    width: 210px;
    height: 186px;
    right: 20px;
  }
  .left_star_rocket {
    bottom: 0;
    width: 210px;
    height: 186px;
    left: 20px;
  }
}

@media (min-width: 900px) and (max-width: 1000px) {
  .views_count {
    top: -60px;
    font-size: 75px;
    filter: drop-shadow(0px 8px 0px #94d1ff);
  }
  .plus::after {
    left: -45px;
    font-size: 75px;
  }
  .views_text {
    bottom: -20px;
    font-size: 30px;
  }
}

@media (min-width: 800px) and (max-width: 900px) {
  .views_count {
    top: -55px;
    font-size: 65px;
    filter: drop-shadow(0px 8px 0px #94d1ff);
  }
  .plus::after {
    left: -38px;
    font-size: 65px;
  }
  .views_text {
    bottom: -20px;
    font-size: 30px;
  }
}

@media (min-width: 700px) and (max-width: 800px) {
  .views_number_section {
    margin-top: 220px;
  }
  .right_star,
  .left_star {
    bottom: -40px;
    width: 220px;
    height: 267px;
  }
  .right_star_rocket {
    bottom: -30px;
    width: 190px;
    height: 199px;
    right: 10px;
  }
  .left_star_rocket {
    bottom: -30px;
    width: 190px;
    height: 199px;
    left: 10px;
  }
  .views_count {
    top: -45px;
    font-size: 55px;
    filter: drop-shadow(0px 8px 0px #94d1ff);
  }
  .plus::after {
    left: -35px;
    font-size: 55px;
  }
  .views_text {
    bottom: -10px;
    font-size: 24px;
  }
}

@media (min-width: 600px) and (max-width: 700px) {
  .views_number_section {
    margin-top: 220px;
  }
  .right_star,
  .left_star {
    bottom: -40px;
    width: 190px;
    height: 231px;
  }
  .right_star_rocket {
    bottom: -10px;
    right: 10px;
    width: 160px;
    height: 142px;
  }
  .left_star_rocket {
    bottom: -10px;
    left: 10px;
    width: 160px;
    height: 142px;
  }
  .views_count {
    top: -40px;
    font-size: 43px;
    filter: drop-shadow(0px 6px 0px #94d1ff);
  }
  .plus::after {
    left: -30px;
    font-size: 43px;
  }
  .views_text {
    bottom: -20px;
    font-size: 24px;
  }
}

@media (min-width: 500px) and (max-width: 600px) {
  .views_number_section {
    margin-top: 180px;
  }
  .wave_3 {
    top: 50px;
  }
  .right_star,
  .left_star {
    bottom: -20px;
    width: 160px;
    height: 194px;
  }
  .right_star_rocket {
    bottom: 10px;
    right: 10px;
    width: 130px;
    height: 115px;
  }
  .left_star_rocket {
    bottom: 10px;
    left: 10px;
    width: 130px;
    height: 115px;
  }
  .views_count {
    top: -35px;
    font-size: 36px;
    filter: drop-shadow(0px 4px 0px #94d1ff);
  }
  .plus::after {
    left: -25px;
    font-size: 36px;
  }
  .views_text {
    bottom: -5px;
    font-size: 22px;
  }
}

@media (min-width: 400px) and (max-width: 500px) {
  .views_number_section {
    margin-top: 75px;
    min-height: 120px;
  }
  .wave_3 {
    top: 40px;
  }
  .right_star,
  .left_star {
    bottom: -10px;
    width: 110px;
    height: 134px;
  }
  .right_star_rocket,
  .left_star_rocket {
    bottom: -8px;
    width: 110px;
    height: 100px;
  }
  .views_count {
    top: -25px;
    font-size: 31px;
    filter: drop-shadow(0px 4px 0px #94d1ff);
  }
  .odometer2 {
    letter-spacing: 0;
  }
  .plus::after {
    left: -20px;
    font-size: 31px;
  }
  .views_text {
    bottom: -20px;
    font-size: 16px;
  }
}

@media (max-width: 400px) {
  .views_number_section {
    margin-top: 75px;
    min-height: 110px;
  }
  .wave_3 {
    top: 40px;
  }
  .right_star,
  .left_star {
    bottom: -5px;
    width: 100px;
    height: 124px;
  }
  .right_star_rocket,
  .left_star_rocket {
    bottom: -3px;
    width: 105px;
    height: 95px;
  }
  .views_count {
    top: -25px;
    font-size: 26px;
    filter: drop-shadow(0px 4px 0px #94d1ff);
  }
  .odometer2 {
    letter-spacing: 0;
  }
  .plus::after {
    left: -20px;
    font-size: 26px;
  }
  .views_text {
    bottom: -10px;
    font-size: 16px;
  }
}
</style>
