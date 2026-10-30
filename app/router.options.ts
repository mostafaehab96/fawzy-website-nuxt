import type { RouterConfig } from '@nuxt/schema'

/**
 * Custom router scroll behavior:
 *   - Same-page hash click (e.g. `/videos#Shorts` -> `/videos#Youtube`):
 *     Target section is already mounted, so smooth-scroll immediately with 0ms delay.
 *   - Cross-page hash click (e.g. `/` -> `/videos#Collage`):
 *     Reset to top cleanly, wait for the new page DOM to paint, then smooth-scroll.
 *   - Standard page change (e.g. `/videos` -> `/blog`):
 *     Open cleanly at top (`behavior: 'instant'`).
 */
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      if (to.path === from.path) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      }

      return new Promise((resolve) => {
        if (import.meta.client) {
          window.scrollTo({ top: 0, behavior: 'instant' })
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              resolve({
                el: to.hash,
                behavior: 'smooth',
              })
            })
          })
        } else {
          resolve({ el: to.hash })
        }
      })
    }

    return { top: 0, behavior: 'instant' }
  },
}
