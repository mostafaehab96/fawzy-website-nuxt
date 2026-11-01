/**
 * Native Scroll-Reveal Composable (`composables/useAos.ts`)
 * ---------------------------------------------------------
 * Lightweight zero-dependency replacement for external `aos.css` + `aos.js`.
 * Uses a single browser `IntersectionObserver` to toggle `.aos-animate` on
 * `[data-aos]` elements without render-blocking CDN stylesheets or polling.
 */

export function useAos() {
  const route = useRoute()
  let observer: IntersectionObserver | null = null

  function observeElements() {
    if (!import.meta.client) return
    observer?.disconnect()

    const elements = document.querySelectorAll<HTMLElement>('[data-aos]')
    if (!elements.length) return

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('aos-animate'))
      return
    }

    // Pre-mark elements already in or above the viewport before enabling CSS hiding
    const viewportHeight = window.innerHeight
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < viewportHeight * 0.98) {
        el.classList.add('aos-animate')
      }
    })

    document.documentElement.classList.add('aos-ready')

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate')
          } else if (entry.boundingClientRect.top > 0) {
            // Reset only when the element falls back below the viewport (matches AOS `once: false, mirror: false`)
            entry.target.classList.remove('aos-animate')
          }
        }
      },
      { rootMargin: '0px 0px -2% 0px', threshold: 0.01 }
    )

    elements.forEach((el) => observer?.observe(el))
  }

  watch(
    () => route.path,
    async () => {
      await nextTick()
      observeElements()
    }
  )

  onMounted(() => {
    observeElements()
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
