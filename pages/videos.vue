<script setup lang="ts">
/**
 * Portfolio Videos Page (`pages/videos.vue`) — Route: `/videos`
 * -------------------------------------------------------------
 * Displays all 4 portfolio categories:
 *   1. `#Shorts`   — Vertical 9:16 Vimeo shorts
 *   2. `#Youtube`  — Horizontal 16:9 YouTube edits
 *   3. `#Collage`  — Horizontal 16:9 Collage Art animations
 *   4. `#with_Ai`  — Local MP4 AI video showcases
 *
 * Clicking any video thumbnail plays that Vimeo card at full volume and
 * automatically pauses/restores any previously active card. Clicking anywhere
 * outside a card pauses all active Vimeo players.
 *
 * Add/remove videos in `data/videos.ts`.
 */
import {
  aiShortsVideos,
  aiYoutubeVideos,
  collageVideos,
  shortsVideos,
  youtubeVideos,
} from '~/data/videos'

useHead({
  title: 'Fawzy — أعمالي',
})

// Tracks which single card is currently playing (`category:vimeoId`), or `null`
const activeCardKey = ref<string | null>(null)

function handleCardPlay(cardKey: string) {
  activeCardKey.value = cardKey
}

function stopAllVideos() {
  activeCardKey.value = null
}

onMounted(() => {
  document.addEventListener('click', stopAllVideos)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', stopAllVideos)
})
</script>

<template>
  <div class="videos-page">
    <!-- 1. Shorts Section -->
    <section id="Shorts" class="content-section active">
      <VideosVideoSectionHeader
        title="Shorts"
        subtitle-line1="،محتوى سريع، إيقاع عصري”"
        subtitle-line2="“.كل فيديو هو قصة سريعة مصممة لتترك أثرًا"
        is-first
      />

      <div class="cards-container">
        <VideosVimeoVideoCard
          v-for="(item, index) in shortsVideos"
          :key="`short-${item.vimeoId}`"
          :vimeo-id="item.vimeoId"
          :thumbnail="item.thumbnail"
          :title="item.title"
          variant="short"
          :priority="index < 4"
          :is-playing="activeCardKey === `short-${item.vimeoId}`"
          @play="handleCardPlay(`short-${item.vimeoId}`)"
        />
      </div>
    </section>

    <!-- 2. YouTube Videos Section -->
    <section id="Youtube" class="content-section">
      <VideosVideoSectionHeader
        title="Youtube Videos"
        subtitle-line1=".مساحتي الإبداعية الأكبر”"
        subtitle-line2="“. مجموعة من الفيديوهات صنعتها بحب وشغف لليوتيوب"
      />

      <div class="cards-container_youtube">
        <VideosVimeoVideoCard
          v-for="item in youtubeVideos"
          :key="`yt-${item.vimeoId}`"
          :vimeo-id="item.vimeoId"
          :thumbnail="item.thumbnail"
          :title="item.title"
          variant="landscape"
          :is-playing="activeCardKey === `yt-${item.vimeoId}`"
          @play="handleCardPlay(`yt-${item.vimeoId}`)"
        />
      </div>
    </section>

    <!-- 3. Collage Art Animation Section -->
    <section id="Collage" class="content-section">
      <VideosVideoSectionHeader
        title="Collage Art Animation"
        subtitle-line1="فن، حركة، إبداع، هنا تتحول الصور الثابتة”"
        subtitle-line2="“.إلى لوحات متحركة فريدة"
      />

      <div class="cards-container_youtube">
        <VideosVimeoVideoCard
          v-for="item in collageVideos"
          :key="`collage-${item.vimeoId}`"
          :vimeo-id="item.vimeoId"
          :thumbnail="item.thumbnail"
          :title="item.title"
          variant="landscape"
          :is-playing="activeCardKey === `collage-${item.vimeoId}`"
          @play="handleCardPlay(`collage-${item.vimeoId}`)"
        />
      </div>
    </section>

    <!-- 4. Made with AI Section -->
    <section id="with_Ai" class="content-section">
      <VideosVideoSectionHeader
        title="Made with Ai"
        subtitle-line1="استكشاف للإمكانيات اللانهائية. مشاهد تم تنفيذها”"
        subtitle-line2="“.بالتعاون مع أدوات الذكاء الاصطناعي الإبداعية"
      />

      <div class="with_ai_shorts with_ai">
        <VideosAiVideoCard
          v-for="clip in aiShortsVideos"
          :key="clip.id"
          :video-src="clip.videoSrc"
          variant="short"
        />
      </div>

      <div class="with_ai_youtube with_ai">
        <VideosAiVideoCard
          v-for="clip in aiYoutubeVideos"
          :key="clip.id"
          :video-src="clip.videoSrc"
          variant="landscape"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ==========================================================================
   Videos Page Grid Layout Styles (migrated from `videos_page.css`)
   ========================================================================== */

#Shorts,
#Youtube,
#Collage,
#with_Ai {
  scroll-margin-top: 160px;
}

/* Shorts Grid */
.cards-container {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 60px;
  width: 100%;
  max-width: 1500px;
  margin: 50px auto 2.5rem;
  padding: 0 40px;
}

@media (max-width: 1050px) {
  .cards-container {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 60px;
  }
}

@media (max-width: 767px) {
  .cards-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

/* YouTube & Collage Grids */
.cards-container_youtube {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(517px, 1fr));
  gap: 10px;
  row-gap: 50px;
  width: 100%;
  max-width: 1750px;
  margin: 50px auto 2.5rem;
  padding: 0 40px;
}

@media (max-width: 1660px) {
  .cards-container_youtube {
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  }
}

@media (max-width: 1465px) {
  .cards-container_youtube {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 1320px) {
  .cards-container_youtube {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  }
}

@media (max-width: 1110px) {
  .cards-container_youtube {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}

@media (max-width: 910px) {
  .cards-container_youtube {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 7px;
  }
}

@media (max-width: 800px) {
  .cards-container_youtube {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

/* Made with AI Grids */
.with_ai {
  margin-bottom: 150px;
}

.with_ai_shorts {
  margin: 70px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 90%;
  gap: 100px;
  row-gap: 50px;
  padding: 0 10px;
}

@media (max-width: 1350px) {
  .with_ai_shorts {
    gap: 50px;
  }
}

.with_ai_youtube {
  margin: 70px auto 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 0 10px;
}
</style>
