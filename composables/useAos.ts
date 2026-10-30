/**
 * Animate On Scroll Composable (`composables/useAos.ts`)
 * ------------------------------------------------------
 * Initializes and refreshes the AOS (Animate On Scroll) library cleanly
 * inside Vue's `onMounted` / `onBeforeUnmount` lifecycle hooks.
 */

declare global {
  interface Window {
    AOS?: {
      init: (options?: { duration?: number; once?: boolean }) => void
      refresh: () => void
    }
  }
}

export function useAos() {
  const route = useRoute()

  // Refresh AOS element offsets only when navigating to a new page
  // (Never call `AOS.refresh()` on every `scroll` event — AOS already manages its
  // own scroll listener, and refreshing on scroll causes 60fps layout thrashing!)
  watch(
    () => route.path,
    () => {
      if (import.meta.client) {
        requestAnimationFrame(() => {
          window.AOS?.refresh()
        })
      }
    }
  )

  onMounted(() => {
    // Initialize immediately if AOS script has loaded, or wait briefly for defer script
    const initAos = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 1200,
          once: false,
        })
        return true
      }
      return false
    }

    if (!initAos()) {
      const checkTimer = window.setInterval(() => {
        if (initAos()) {
          window.clearInterval(checkTimer)
        }
      }, 100)
      window.setTimeout(() => window.clearInterval(checkTimer), 3000)
    }
  })
}
