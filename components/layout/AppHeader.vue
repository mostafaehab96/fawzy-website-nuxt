<script setup lang="ts">
/**
 * Main Site Header (`components/layout/AppHeader.vue`)
 * ----------------------------------------------------
 * Handles:
 *   1. Brand Logo (links to `/`)
 *   2. Desktop Navigation (`ul.d_nav`) + hover dropdown for "أعمالي"
 *   3. Mobile Hamburger Menu (`ul.m-nav`) + click accordion for "أعمالي"
 *   4. Mobile Floating Quick-Jump Menu (`.float_menu_box`) when viewing `/videos`
 *
 * Edit navigation items or YouTube URL in `data/site.ts`.
 */
import { PORTFOLIO_CATEGORIES, SITE_CONFIG } from '~/data/site'

const route = useRoute()

// Reactive UI state (replaces imperative DOM queries from `header.js` & `videos_page.js`)
const isMobileNavOpen = ref(false)
const isMobileDropdownOpen = ref(false)
const isFloatingMenuOpen = ref(false)
// Dismisses the desktop glassmorphic dropdown immediately on click so its
// `backdrop-filter: blur()` overlay doesn't stay stuck open during smooth scroll
const isDesktopDropdownDismissed = ref(false)

const mobileNavRef = ref<HTMLElement | null>(null)
const burgerLabelRef = ref<HTMLElement | null>(null)
const floatingMenuRef = ref<HTMLElement | null>(null)

const isVideosPage = computed(
  () => route.path === '/videos' || route.path === '/videos/'
)

function closeMobileNav() {
  isMobileNavOpen.value = false
  isMobileDropdownOpen.value = false
}

/**
 * Handles clicks on hash links (e.g. `/videos#Youtube`, `/#my_services`).
 * If the URL already matches `targetPath + hash` (for example, the user clicked
 * "Youtube", scrolled manually elsewhere, and clicked "Youtube" again), Vue Router
 * treats it as a duplicate navigation, so we explicitly trigger `scrollIntoView`.
 */
function handleHashLinkClick(targetPath: string, hash: string) {
  isDesktopDropdownDismissed.value = true
  closeMobileNav()
  closeFloatingMenu()

  if (import.meta.client && route.path === targetPath && route.hash === hash) {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function toggleMobileDropdown(e: MouseEvent) {
  e.stopPropagation()
  isMobileDropdownOpen.value = !isMobileDropdownOpen.value
}

function toggleFloatingMenu(e: MouseEvent) {
  e.stopPropagation()
  isFloatingMenuOpen.value = !isFloatingMenuOpen.value
}

function closeFloatingMenu() {
  isFloatingMenuOpen.value = false
}

// Close open menus when route changes
watch(
  () => route.fullPath,
  () => {
    closeMobileNav()
    closeFloatingMenu()
  }
)

// Close mobile nav & floating menu when clicking anywhere outside
function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null
  if (!target) return

  if (
    isMobileNavOpen.value &&
    mobileNavRef.value &&
    !mobileNavRef.value.contains(target) &&
    burgerLabelRef.value &&
    !burgerLabelRef.value.contains(target)
  ) {
    closeMobileNav()
  } else if (isMobileDropdownOpen.value && mobileNavRef.value && !mobileNavRef.value.contains(target)) {
    isMobileDropdownOpen.value = false
  }

  if (
    isFloatingMenuOpen.value &&
    floatingMenuRef.value &&
    !floatingMenuRef.value.contains(target)
  ) {
    closeFloatingMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <header class="main-header">
    <div class="container">
      <!-- Brand Logo -->
      <div class="logo_header">
        <NuxtLink to="/" aria-label="Home">
          <img
            class="logo_img"
            src="/images/logo_svg.svg"
            width="87"
            height="60"
            alt="Fawzy Logo"
          />
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <div class="nav">
        <!-- Desktop Navigation -->
        <ul class="d_nav">
          <li>
            <a
              id="link1"
              class="d_links_youtube"
              :href="SITE_CONFIG.youtubeChannelUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              قناة اليوتيوب
              <img
                class="play_header"
                src="/images/play_red.svg"
                width="40"
                height="48"
                alt=""
              />
            </a>
          </li>

          <li
            class="a3maly_link"
            @mouseenter="isDesktopDropdownDismissed = false"
            @mouseleave="isDesktopDropdownDismissed = false"
          >
            <NuxtLink id="link6" class="d_links a3maly" to="/videos">
              أعمالي
            </NuxtLink>
            <div
              id="services-dropdown"
              class="dropdown-menu"
              :class="{ 'dropdown-dismissed': isDesktopDropdownDismissed }"
            >
              <NuxtLink
                v-for="cat in PORTFOLIO_CATEGORIES"
                :key="cat.hash"
                :to="`/videos${cat.hash}`"
                class="dropdown-item any_link"
                @click="handleHashLinkClick('/videos', cat.hash)"
              >
                {{ cat.dropdownLabel }}
              </NuxtLink>
            </div>
          </li>

          <li>
            <NuxtLink
              class="d_links"
              to="/#my_services"
              @click="handleHashLinkClick('/', '#my_services')"
            >
              خدماتي
            </NuxtLink>
          </li>

          <li>
            <NuxtLink id="link4" class="d_links" to="/blog">المدونة</NuxtLink>
          </li>
        </ul>

        <!-- Mobile Hamburger Button -->
        <label
          ref="burgerLabelRef"
          for="check"
          class="menuButton"
          :class="{ active_menuButton: isMobileNavOpen }"
        >
          <input
            id="check"
            v-model="isMobileNavOpen"
            class="toogle"
            type="checkbox"
            aria-label="Toggle Mobile Navigation"
          />
          <svg
            class="svg_burger"
            :style="{ transform: isMobileNavOpen ? 'rotate(-45deg)' : 'rotate(0)' }"
            viewBox="0 0 32 32"
          >
            <path
              class="line_burger line_top_bottom_burger"
              :class="{ active_burger: isMobileNavOpen }"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            />
            <path class="line_burger" d="M7 16 27 16" />
          </svg>
        </label>

        <!-- Mobile Drawer Navigation -->
        <div
          ref="mobileNavRef"
          class="m-nav"
          :class="{ 'show-m-nav': isMobileNavOpen }"
        >
          <ul class="m-nav-container">
            <li
              class="m-lin a3maly_link_mobile"
              :class="{ trans: isMobileNavOpen }"
              @click="toggleMobileDropdown"
            >
              <button
                type="button"
                class="m_links a3maly_mobile"
                :class="{ active_a3maly_mobile: isMobileDropdownOpen }"
                :aria-expanded="isMobileDropdownOpen"
              >
                أعمالي
              </button>
              <div
                class="dropdown-menu_mobile"
                :class="{ active: isMobileDropdownOpen }"
              >
                <NuxtLink
                  v-for="cat in PORTFOLIO_CATEGORIES"
                  :key="cat.hash"
                  :to="`/videos${cat.hash}`"
                  class="dropdown-item_mobile any_link"
                  @click.stop="handleHashLinkClick('/videos', cat.hash)"
                >
                  {{ cat.dropdownLabel }}
                </NuxtLink>
              </div>
            </li>

            <li class="m-lin" :class="{ trans: isMobileNavOpen }">
              <NuxtLink
                class="m_links m_links_to_clodse_nav"
                to="/#my_services"
                @click="handleHashLinkClick('/', '#my_services')"
              >
                خدماتي
              </NuxtLink>
            </li>

            <li class="m-lin" :class="{ trans: isMobileNavOpen }">
              <NuxtLink
                class="m_links m_links_to_clodse_nav"
                to="/blog"
                @click="closeMobileNav"
              >
                المدونة
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Floating Quick-Jump Menu (visible on mobile when viewing `/videos`) -->
    <div
      v-if="isVideosPage"
      ref="floatingMenuRef"
      class="float_menu_box"
      :class="{ active: isFloatingMenuOpen }"
    >
      <div
        id="menuToggle"
        class="float_circle"
        :class="{ active: isFloatingMenuOpen }"
        @click="toggleFloatingMenu"
      >
        <div class="bar-container">
          <svg
            class="arrow"
            viewBox="0 0 256 512"
            width="15"
            height="30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
            />
          </svg>
        </div>
      </div>

      <div class="subs" :class="{ active: isFloatingMenuOpen }">
        <NuxtLink
          v-for="cat in PORTFOLIO_CATEGORIES"
          :key="cat.hash"
          class="sub-circle"
          :to="`/videos${cat.hash}`"
          @click="handleHashLinkClick('/videos', cat.hash)"
        >
          {{ cat.floatingLabel }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* ==========================================================================
   Header & Navigation Styles (migrated from `header.css` & `videos_page.css`)
   ========================================================================== */

.main-header {
  background-color: #c9e8ff;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.main-header::before {
  content: '';
  width: 100%;
  height: 5px;
  position: absolute;
  background-color: #ffffff;
  border-bottom: 3px solid #c9e8ff;
  bottom: 0;
}

.main-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  height: 153px;
  direction: rtl;
  padding: 0 90px;
}

@media screen and (max-width: 1200px) {
  .main-header .container {
    padding: 0 35px;
  }
}

/* Desktop Navigation */
.d_nav {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
  position: relative;
}

.d_nav::before {
  content: '';
  position: absolute;
  height: 102%;
  width: 103%;
  left: 53%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #ffffff;
  border-radius: 40px;
  padding-top: 17px;
  padding-bottom: 16.5px;
  padding-right: 0;
  padding-left: 30px;
  pointer-events: none;
}

.play_header {
  position: absolute;
  left: -25px;
  top: -3px;
  transition: 0.6s;
  z-index: 1000;
  width: 40px;
  height: 48px;
}

.d_links_youtube {
  text-decoration: none;
  font-size: 16px;
  position: relative;
  font-weight: 800;
  overflow: hidden;
  padding: 10px 30px;
  border-radius: 40px;
  margin-left: 15px;
  color: #ffffff;
  background-color: #ff7174;
  border: 2px solid #ff0000;
  cursor: pointer;
  white-space: nowrap;
  transition: 0.4s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.d_links_youtube:hover {
  color: #ff0000;
  background-color: #c9e8ff;
}

.d_links {
  text-decoration: none;
  font-size: 15px;
  position: relative;
  font-weight: 800;
  overflow: hidden;
  padding: 10px 30px;
  border-radius: 40px;
  margin-left: 50px;
  color: #ffffff;
  background-color: #0c00b5;
  cursor: pointer;
  white-space: nowrap;
  border: 2px solid #0c00b5;
  transition-duration: 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.d_links:hover {
  color: #0c00b5;
  background-color: #c9e8ff;
  border: 2px solid #0c00b5;
}

.d_links::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 136%;
  left: -35px;
  top: -10px;
  border: 2px solid #ffffff;
  border-radius: 40px 0 0 40px;
  border-right: 0;
  pointer-events: none;
}

/* Desktop Portfolio Dropdown */
.a3maly_link {
  position: relative;
}

.a3maly_link .a3maly {
  position: relative;
  padding-left: 50px;
}

.a3maly_link .a3maly::after {
  position: absolute;
  content: '';
  width: 13px;
  height: 21px;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #c9e8ff;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z'/%3E%3C/svg%3E")
    no-repeat center / contain;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z'/%3E%3C/svg%3E")
    no-repeat center / contain;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  z-index: 1;
  pointer-events: none;
}

.a3maly_link .a3maly:hover::after {
  background-color: #0c00b5;
  transform: translateY(-50%) rotate(-180deg);
}

.dropdown-menu {
  position: absolute;
  top: 65px;
  left: -15px;
  border-radius: 10px;
  padding: 1.6rem 0;
  width: 250px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translateY(0);
  z-index: 100;
  box-shadow: 0 0 20px #00000010;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  direction: ltr;
  backdrop-filter: blur(3px) saturate(60%);
  -webkit-backdrop-filter: blur(15px) saturate(94%);
  background-color: rgba(255, 255, 255, 0.356);
  border: 1px solid #14141423;
}

.a3maly_link:hover .dropdown-menu:not(.dropdown-dismissed) {
  opacity: 1;
  visibility: visible;
  transform: translateY(-18px);
}

.dropdown-item {
  text-decoration: none;
  font-size: 15px;
  position: relative;
  font-weight: 800;
  overflow: hidden;
  border-radius: 40px;
  color: #ffffff;
  background-color: #0c00b5;
  cursor: pointer;
  white-space: nowrap;
  border: 2px solid #0c00b5;
  transition-duration: 0.3s;
  width: 122px;
  padding: 10px 28px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-item:not(:last-child) {
  margin-bottom: 20px;
}

.dropdown-item i {
  display: none;
}

.dropdown-item:hover {
  backdrop-filter: blur(50px) saturate(100%);
  -webkit-backdrop-filter: blur(15px) saturate(94%);
  background-color: rgba(255, 255, 255, 0.356);
  color: #081ee2;
}

/* Mobile Portfolio Accordion */
.a3maly_link_mobile {
  position: relative;
  margin-bottom: -20px;
}

.a3maly_link_mobile .a3maly_mobile {
  position: relative;
  padding-left: 50px;
}

.a3maly_mobile.active_a3maly_mobile {
  background-color: #c9e8ff;
  color: #0c00b5;
}

.a3maly_link_mobile .a3maly_mobile::after {
  position: absolute;
  content: '';
  width: 13px;
  height: 21px;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #c9e8ff;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z'/%3E%3C/svg%3E")
    no-repeat center / contain;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z'/%3E%3C/svg%3E")
    no-repeat center / contain;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  z-index: 1;
  pointer-events: none;
}

.a3maly_link_mobile .a3maly_mobile:hover::after {
  background-color: #0c00b5;
}

.a3maly_link_mobile .a3maly_mobile.active_a3maly_mobile::after {
  background-color: #0c00b5;
  transform: translateY(-50%) rotate(-180deg);
}

.dropdown-menu_mobile {
  position: static;
  width: 80%;
  border-radius: 10px;
  margin: 0 auto;
  opacity: 0;
  max-height: 0;
  padding: 0;
  visibility: visible;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #b6d2e76c;
  border: 1px solid #0c00b549;
}

.dropdown-menu_mobile.active {
  opacity: 1;
  max-height: 500px;
  padding: 1rem 0;
  margin-top: 0.5rem;
  margin-bottom: 60px;
}

.dropdown-item_mobile {
  padding: 10px 25px !important;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 800;
  font-size: 20px;
  position: relative;
  width: 90%;
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #0c00b5;
  background-color: #b6d2e76c;
  border: 2px solid #5348f023;
}

.dropdown-item_mobile:not(:last-child) {
  margin-bottom: 20px;
}

.dropdown-item_mobile:hover {
  background-color: #b6d2e7ad;
  color: #0c00b5;
  padding-right: 30px !important;
  border: 2px solid #5348f0c4;
}

.dropdown-item_mobile i {
  display: none;
}

/* Mobile Burger Button */
.menuButton {
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 13%;
  width: 3.1em;
  height: 3.1em;
  border-radius: 0.5em;
  border: 2px solid white;
  transition: all 0.3s;
  cursor: pointer;
  position: absolute;
}

.menuButton:hover,
.menuButton.active_menuButton {
  border: 2px solid #0f00db5b;
  transition-duration: 0.3s;
}

.toogle {
  position: absolute;
  width: 3.5em;
  height: 3.5em;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
}

.svg_burger {
  height: 3em;
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line_burger {
  fill: none;
  stroke: #0f00db;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
  transition:
    stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line_top_bottom_burger {
  stroke-dasharray: 12 63;
}

.line_top_bottom_burger.active_burger {
  stroke-dasharray: 20 300;
  stroke-dashoffset: -32.42;
}

/* Mobile Navigation Drawer */
.m-nav {
  position: absolute;
  overflow: hidden;
  background-color: #c9e8ff;
  top: 120px;
  right: 0;
  width: 100%;
  height: 0;
  list-style: none;
  z-index: 555 !important;
  margin-right: 0;
}

.m-nav-container {
  padding-top: 8px;
  list-style: none;
  z-index: 555 !important;
}

.m-nav li {
  opacity: 0;
  transform: translateY(50px);
}

.trans:nth-of-type(1) {
  animation: translateIntro 0.3s 0.3s ease forwards;
}

.trans:nth-of-type(2) {
  animation: translateIntro 0.3s 0.4s ease forwards;
}

.trans:nth-of-type(3) {
  animation: translateIntro 0.3s 0.5s ease forwards;
}

@keyframes translateIntro {
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}

.m_links {
  z-index: 555;
  color: white;
  background-color: #0c00b5;
  border: 2px solid #0c00b5;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-family: inherit;
  line-height: inherit;
  font-weight: 800;
  font-size: 20px;
  cursor: pointer;
  transition-duration: 0.3s;
  width: 150px;
  margin: 30px auto 20px;
  border-radius: 40px;
  padding: 10px 25px;
}

.m_links:hover {
  background-color: #c9e8ff;
  color: #0c00b5;
}

.show-m-nav {
  height: fit-content;
  padding-bottom: 30px;
  z-index: 555 !important;
  transition-duration: 0.3s;
}

/* Header Responsive Media Queries */
@media screen and (max-width: 970px) {
  .d_links {
    width: 100px;
    height: 45px;
    margin-left: 25px;
    font-size: 13px;
  }

  .d_links_youtube {
    width: 140px;
    height: 40px;
    margin-left: 10px;
    font-size: 14px;
  }

  .play_header {
    left: -20px;
    top: -3px;
    width: 36px;
    height: 44px;
  }

  .d_nav::before {
    height: 85%;
    width: 95%;
    left: 53%;
    top: 50%;
    padding-left: 60px;
  }

  .d_links::before {
    left: -20px;
  }

  .dropdown-menu {
    left: -70px;
  }

  .a3maly_link .a3maly::after {
    left: 26px;
    top: 52%;
  }
}

@media screen and (max-width: 767px) {
  .main-header .container {
    height: 120px;
  }

  .d_nav {
    margin-left: 60px;
    margin-top: -6px;
  }

  .logo_header {
    margin-top: 0;
    margin-right: -10px !important;
  }

  .menuButton {
    display: flex;
    top: 32px;
    left: 20px;
  }

  .d_links {
    display: none;
  }

  .d_nav::before {
    height: 70%;
    width: 65%;
    left: 53%;
    top: 50%;
    padding-left: 60px;
  }

  .play_header {
    left: -20px;
    top: -2px;
    width: 36px;
    height: 44px;
  }
}

@media screen and (min-width: 768px) {
  .m-nav {
    width: 0;
  }
}

@media screen and (max-width: 560px) {
  .d_nav {
    margin-left: 50px;
    margin-top: -10px;
  }

  .d_links_youtube {
    width: 100px;
    height: 30px;
    margin-left: 10px;
    font-size: 13px !important;
    padding: 6px 18px;
  }

  .play_header {
    left: -20px;
    top: -2px;
    width: 33px;
    height: 41px;
  }

  .logo_header {
    margin-top: 8px;
  }

  .logo_img {
    width: 68px !important;
    height: 47px !important;
  }

  .menuButton {
    display: flex;
    top: 32px;
    left: 20px;
    width: 2.8em;
    height: 2.8em;
    border-radius: 0.5em;
  }
}

/* ==========================================================================
   Floating Quick-Jump Menu for `/videos` (migrated from `videos_page.css`)
   ========================================================================== */
.float_menu_box {
  position: absolute;
  bottom: -70px;
  left: 30px;
  display: none;
}

@media (max-width: 767px) {
  .float_menu_box {
    display: block;
  }
}

.float_circle {
  position: relative;
  width: 40px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #0c00b52c;
  background: linear-gradient(130deg, #ffffff, #a6a2e2, #ffffff);
  background-size: 200% 100%;
  background-position: 100% 0;
  transition: all 0.3s;
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

.float_circle:hover {
  border: 1px solid #0c00b5b6;
}

.float_circle.active {
  border: 1px solid #0c00b5b6;
  background: #0c00b5;
}

.bar-container {
  position: relative;
}

.arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  border-radius: 50px;
  color: #0f00db;
}

.float_circle.active .arrow {
  color: #ffffff;
}

.subs {
  position: absolute;
  top: 0;
  left: 50px;
  width: 247px;
  height: 255px;
  pointer-events: none;
}

.subs.active {
  backdrop-filter: blur(3px) saturate(60%);
  -webkit-backdrop-filter: blur(15px) saturate(94%);
  background-color: #ffffff5b;
  border: 1px solid #0c00b52c;
  border-radius: 10px;
}

.sub-circle {
  position: absolute;
  width: 200px;
  color: #0c00b5;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  text-decoration: none;
  backdrop-filter: blur(3px) saturate(60%);
  -webkit-backdrop-filter: blur(15px) saturate(94%);
  background-color: #ffffff5b;
  border: 2px solid #0c00b52c;
  border-radius: 40px;
  font-weight: 800;
  transform: translateX(-50px) scale(0.5);
  transition: all 0.4s ease;
}

.sub-circle:hover {
  border: 2px solid #0c00b560;
}

.float_menu_box.active .sub-circle {
  opacity: 1;
  pointer-events: auto;
}

.sub-circle:nth-child(1) {
  transform: translateY(10px);
}
.sub-circle:nth-child(2) {
  transform: translateY(70px);
}
.sub-circle:nth-child(3) {
  transform: translateY(130px);
}
.sub-circle:nth-child(4) {
  transform: translateY(190px);
}

.float_menu_box.active .sub-circle:nth-child(1) {
  transform: translate(22px, 10px) scale(1);
  transition-delay: 0.1s;
  padding: 10px 13px;
}
.float_menu_box.active .sub-circle:nth-child(2) {
  transform: translate(22px, 70px) scale(1);
  transition-delay: 0.2s;
  padding: 10px 13px;
}
.float_menu_box.active .sub-circle:nth-child(3) {
  transform: translate(22px, 130px) scale(1);
  transition-delay: 0.3s;
  padding: 10px 13px;
}
.float_menu_box.active .sub-circle:nth-child(4) {
  transform: translate(22px, 190px) scale(1);
  transition-delay: 0.4s;
  padding: 10px 13px;
}
</style>
