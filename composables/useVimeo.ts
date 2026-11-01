/**
 * Vimeo Fetching & Player Composable (`composables/useVimeo.ts`)
 * --------------------------------------------------------------
 * Provides:
 *   1. `useVimeoOembed(vimeoId, enabled)` — Uses Nuxt 3's `useFetch` to retrieve
 *      video metadata (thumbnail_url, title, duration, dimensions) from Vimeo's
 *      public oEmbed endpoint (`https://vimeo.com/api/oembed.json`).
 *   2. `fetchVimeoOembed(vimeoId)` — Uses Nuxt 3's `$fetch` for imperative/on-demand
 *      metadata fetching.
 *   3. `playVimeoIframe(iframe)` / `pauseVimeoIframe(iframe)` — Clean typed wrappers
 *      around Vimeo's Player SDK (`https://player.vimeo.com/api/player.js`).
 */

export interface VimeoOembedResponse {
  type: string
  version: string
  provider_name: string
  title: string
  author_name: string
  width: number
  height: number
  duration: number
  description: string
  thumbnail_url: string
  thumbnail_width: number
  thumbnail_height: number
  video_id: number
}

interface VimeoSdkPlayer {
  ready?: () => Promise<void>
  play: () => Promise<void>
  pause: () => Promise<void>
  setVolume: (volume: number) => Promise<number>
}

declare global {
  interface Window {
    Vimeo?: {
      Player: new (element: HTMLIFrameElement) => VimeoSdkPlayer
    }
  }
}

const VIMEO_OEMBED_ENDPOINT = 'https://vimeo.com/api/oembed.json'
const VIMEO_SDK_URL = 'https://player.vimeo.com/api/player.js'

let vimeoSdkPromise: Promise<boolean> | null = null

/**
 * Dynamically loads the Vimeo Player JS SDK on first user interaction so
 * initial page loads don't open an unused connection or set third-party cookies.
 */
function ensureVimeoSdkLoaded(): Promise<boolean> {
  if (!import.meta.client) return Promise.resolve(false)
  if (window.Vimeo?.Player) return Promise.resolve(true)
  if (vimeoSdkPromise) return vimeoSdkPromise

  vimeoSdkPromise = new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = VIMEO_SDK_URL
    script.async = true
    script.onload = () => resolve(Boolean(window.Vimeo?.Player))
    script.onerror = () => {
      vimeoSdkPromise = null
      resolve(false)
    }
    document.head.appendChild(script)
  })

  return vimeoSdkPromise
}

/**
 * Builds the Vimeo embed player URL for an `<iframe>`.
 */
export function getVimeoEmbedUrl(
  vimeoId: string,
  options: { autoplay?: boolean; muted?: boolean } = {}
): string {
  const params = new URLSearchParams()
  if (options.autoplay) {
    params.set('autoplay', '1')
  }
  if (options.muted !== undefined) {
    params.set('muted', options.muted ? '1' : '0')
  }
  const query = params.toString()
  return `https://player.vimeo.com/video/${vimeoId}${query ? `?${query}` : ''}`
}

/**
 * Reactive Nuxt 3 `useFetch` wrapper for Vimeo oEmbed metadata.
 * Automatically resolves `thumbnail_url` and `title` when `immediate` is true
 * (for example, when a video entry in `data/videos.ts` has no local thumbnail).
 */
export function useVimeoOembed(vimeoId: MaybeRefOrGetter<string>, immediate = true) {
  return useFetch<VimeoOembedResponse>(VIMEO_OEMBED_ENDPOINT, {
    key: () => `vimeo-oembed-${toValue(vimeoId)}`,
    query: computed(() => ({
      url: `https://vimeo.com/${toValue(vimeoId)}`,
    })),
    immediate,
    lazy: true,
    server: false,
  })
}

/**
 * On-demand `$fetch` helper to query Vimeo oEmbed metadata imperatively.
 */
export async function fetchVimeoOembed(vimeoId: string): Promise<VimeoOembedResponse | null> {
  try {
    return await $fetch<VimeoOembedResponse>(VIMEO_OEMBED_ENDPOINT, {
      query: { url: `https://vimeo.com/${vimeoId}` },
    })
  } catch (err) {
    console.warn(`[useVimeo] Failed to fetch oEmbed metadata for ${vimeoId}:`, err)
    return null
  }
}

/**
 * Plays a Vimeo `<iframe>` at full volume using the Vimeo Player SDK.
 * Awaits `player.ready()` so newly mounted click-to-load iframes initialize cleanly.
 */
export async function playVimeoIframe(iframe: HTMLIFrameElement | null): Promise<boolean> {
  if (!import.meta.client || !iframe) return false
  const sdkReady = await ensureVimeoSdkLoaded()
  if (!sdkReady || !window.Vimeo?.Player) return false
  try {
    const player = new window.Vimeo.Player(iframe)
    if (typeof player.ready === 'function') {
      await player.ready()
    }
    await player.setVolume(1)
    await player.play()
    return true
  } catch (err) {
    console.warn('[useVimeo] Play with sound failed:', err)
    return false
  }
}

/**
 * Pauses a Vimeo `<iframe>` using the Vimeo Player SDK.
 */
export async function pauseVimeoIframe(iframe: HTMLIFrameElement | null): Promise<void> {
  if (!import.meta.client || !iframe || !window.Vimeo?.Player) return
  try {
    const player = new window.Vimeo.Player(iframe)
    await player.pause()
  } catch {
    // Ignore pause errors on uninitialized frames
  }
}
