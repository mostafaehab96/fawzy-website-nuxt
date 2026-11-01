/**
 * Portfolio Videos Data (`data/videos.ts`)
 * ----------------------------------------
 * Central source of truth for all Vimeo and local AI videos across:
 *   1. Home Page Featured Slider (`featuredSliderVideos`)
 *   2. `/videos#Shorts` (`shortsVideos`)
 *   3. `/videos#Youtube` (`youtubeVideos`)
 *   4. `/videos#Collage` (`collageVideos`)
 *   5. `/videos#with_Ai` (`aiShortsVideos` & `aiYoutubeVideos`)
 *
 * HOW TO ADD A NEW VIMEO VIDEO:
 *   Add `{ vimeoId: 'YOUR_VIMEO_ID', thumbnail: '/images/...' }` to the desired array.
 *   If you omit `thumbnail`, `VimeoVideoCard.vue` will automatically fetch the thumbnail
 *   from Vimeo's oEmbed API via `composables/useVimeo.ts`!
 */

export interface FeaturedSliderVideo {
  /** Numeric Vimeo video ID (e.g. '1109992558') */
  vimeoId: string
  /** Short muted MP4 teaser loop stored in `public/videos_thum/` */
  teaserSrc: string
  /** Static poster frame displayed before the MP4 teaser buffers */
  poster: string
}

export interface VimeoPortfolioItem {
  /** Numeric Vimeo video ID (e.g. '1109992558') */
  vimeoId: string
  /** Optional local cover image in `public/images/`. Falls back to Vimeo oEmbed thumbnail if omitted. */
  thumbnail?: string
  /** Optional accessible title */
  title?: string
}

export interface LocalAiVideoItem {
  id: string
  /** Path inside `public/AI_videos/` */
  videoSrc: string
}

/** 1. Home page infinite slider videos */
export const featuredSliderVideos: FeaturedSliderVideo[] = [
  { vimeoId: '1109992558', teaserSrc: '/videos_thum/1.mp4', poster: '/images/Shorts/1.jpg' },
  { vimeoId: '1109994127', teaserSrc: '/videos_thum/2.mp4', poster: '/images/Shorts/2.jpg' },
  { vimeoId: '1110027422', teaserSrc: '/videos_thum/3.mp4', poster: '/images/Shorts/3.jpg' },
  { vimeoId: '1109998370', teaserSrc: '/videos_thum/4.mp4', poster: '/images/Shorts/4.jpg' },
  { vimeoId: '1110036742', teaserSrc: '/videos_thum/5.mp4', poster: '/images/Shorts/5.jpg' },
]

/** 2. `/videos#Shorts` — Vertical 9:16 short-form videos */
export const shortsVideos: VimeoPortfolioItem[] = [
  { vimeoId: '1109992558', thumbnail: '/images/Shorts/1.jpg' },
  { vimeoId: '1109994127', thumbnail: '/images/Shorts/2.jpg' },
  { vimeoId: '1110027422', thumbnail: '/images/Shorts/3.jpg' },
  { vimeoId: '1109998370', thumbnail: '/images/Shorts/4.jpg' },
  { vimeoId: '1110036742', thumbnail: '/images/Shorts/5.jpg' },
  { vimeoId: '1110006624', thumbnail: '/images/Shorts/6.jpg' },
  { vimeoId: '1110039317', thumbnail: '/images/Shorts/7.jpg' },
  { vimeoId: '1110023741', thumbnail: '/images/Shorts/8.jpg' },
  { vimeoId: '1110010640', thumbnail: '/images/Shorts/9.jpg' },
  { vimeoId: '1110040597', thumbnail: '/images/Shorts/10.jpg' },
  { vimeoId: '1110009610', thumbnail: '/images/Shorts/11.jpg' },
  { vimeoId: '1110038898', thumbnail: '/images/Shorts/12.jpg' },
  { vimeoId: '1110037870', thumbnail: '/images/Shorts/13.jpg' },
  { vimeoId: '1110172350', thumbnail: '/images/Shorts/14.jpg' },
  { vimeoId: '1110183166', thumbnail: '/images/Shorts/15.jpg' },
  { vimeoId: '1110172793', thumbnail: '/images/Shorts/16.jpg' },
]

/** 3. `/videos#Youtube` — Horizontal 16:9 YouTube videos */
export const youtubeVideos: VimeoPortfolioItem[] = [
  { vimeoId: '1109997245', thumbnail: '/images/Youtube/1.jpg' },
  { vimeoId: '1110025028', thumbnail: '/images/Youtube/2.jpg' },
  { vimeoId: '829327122', thumbnail: '/images/Youtube/3.jpg' },
  { vimeoId: '1109997881', thumbnail: '/images/Youtube/4.jpg' },
  { vimeoId: '829395357', thumbnail: '/images/Youtube/5.jpg' },
  { vimeoId: '829362680', thumbnail: '/images/Youtube/6.jpg' },
  { vimeoId: '1110041270', thumbnail: '/images/Youtube/7.jpg' },
  { vimeoId: '856233345', thumbnail: '/images/Youtube/8.jpg' },
  { vimeoId: '829409625', thumbnail: '/images/Youtube/9.jpg' },
  { vimeoId: '829393121', thumbnail: '/images/Youtube/10.jpg' },
  { vimeoId: '1110010213', thumbnail: '/images/Youtube/11.jpg' },
  { vimeoId: '858889332', thumbnail: '/images/Youtube/12.jpg' },
]

/** 4. `/videos#Collage` — Horizontal 16:9 Collage Art Animation videos */
export const collageVideos: VimeoPortfolioItem[] = [
  { vimeoId: '856029925', thumbnail: '/images/Collage/1.jpg' },
  { vimeoId: '1110030533', thumbnail: '/images/Collage/2.jpg' },
  { vimeoId: '856212590', thumbnail: '/images/Collage/3.jpg' },
  { vimeoId: '829398363', thumbnail: '/images/Collage/4.jpg' },
  { vimeoId: '829361598', thumbnail: '/images/Collage/5.jpg' },
  { vimeoId: '1110184057', thumbnail: '/images/Collage/6.jpg' },
]

/** 5a. `/videos#with_Ai` — Vertical AI showcase clips */
export const aiShortsVideos: LocalAiVideoItem[] = [
  { id: 'ai-short-1', videoSrc: '/AI_videos/1.mp4' },
  { id: 'ai-short-2', videoSrc: '/AI_videos/2.mp4' },
  { id: 'ai-short-3', videoSrc: '/AI_videos/3.mp4' },
]

/** 5b. `/videos#with_Ai` — Horizontal AI showcase clips */
export const aiYoutubeVideos: LocalAiVideoItem[] = [
  { id: 'ai-youtube-4', videoSrc: '/AI_videos/4.mp4' },
  { id: 'ai-youtube-5', videoSrc: '/AI_videos/5.mp4' },
  { id: 'ai-youtube-6', videoSrc: '/AI_videos/6.mp4' },
]
