# Nuxt 3 Architecture & Maintenance Guide (`GUIDE.md`)

Welcome! This guide is written specifically from a **backend engineer's perspective** so you can navigate, modify, extend, and deploy this frontend without needing deep Vue/CSS trivia.

---

## 1. Quick Mental Model (Laravel → Nuxt 3)

| Laravel Concept | Nuxt 3 Equivalent | Location in Project |
| :--- | :--- | :--- |
| `routes/web.php` | **File-based routing** (`pages/`) | `pages/index.vue` (`/`), `pages/videos.vue` (`/videos`), `pages/blog/index.vue` (`/blog`) |
| `@extends('layout')` + `@yield` | **Layouts** (`<NuxtLayout>` + `<slot />`) | `layouts/default.vue` |
| `@include('partials.card')` | **Vue Single-File Components** (`.vue`) | `components/**` |
| Config / Seeders / DTOs | **Typed TypeScript Data Modules** | `data/*.ts` |
| Service / Helper Classes | **Composables** (`useXyz()`) | `composables/*.ts` |
| `public/` (`asset('...')`) | **Static Public Directory** (`/...`) | `public/` (referenced directly as `/images/...`) |
| Global `<head>` & build config | **Framework Config** | `nuxt.config.ts` |

---

## 2. Complete Directory & File Map

```text
nuxt-app/
├── nuxt.config.ts                  # Framework config: Cloudflare Pages preset, global CSS, <head> fonts/SEO
├── app.vue                         # Root shell (<NuxtLayout><NuxtPage /></NuxtLayout>)
├── app/
│   └── router.options.ts           # Smooth hash-anchor scrolling (/#my_services, /videos#Shorts)
├── package.json                    # Scripts (dev, build, generate, preview) & Nuxt 3 dependencies
│
├── data/                           # ⭐ START HERE FOR 90% OF CONTENT EDITS
│   ├── site.ts                     # WhatsApp URL, YouTube URL, 100M views target, nav & social links
│   ├── videos.ts                   # All Vimeo IDs (Home slider, Shorts, YouTube, Collage) + AI MP4s
│   ├── clients.ts                  # Company logos & Content Creator avatars for infinite marquees
│   └── blogs.ts                    # Blog post cards (title, excerpt, cover image, optional article URL)
│
├── composables/                    # Reusable TypeScript logic (Service layer)
│   ├── useVimeo.ts                 # Nuxt `useFetch` / `$fetch` Vimeo oEmbed API + Vimeo Player SDK helpers
│   └── useAos.ts                   # Initializes & refreshes Animate-On-Scroll (AOS) animations
│
├── assets/
│   └── css/
│       └── main.css                # Global CSS reset, `@font-face` (`fawzy`), CSS variables, `.container`
│
├── layouts/
│   └── default.vue                 # Wraps every page with Header, Main content slot, Footer, ScrollToTop
│
├── pages/                          # Every `.vue` file here automatically becomes a URL route
│   ├── index.vue                   # Route: `/`       — Assembles the 7 Home sections in order
│   ├── videos.vue                  # Route: `/videos` — Shorts, YouTube, Collage, and Made with AI grids
│   └── blog/
│       └── index.vue               # Route: `/blog`   — Full blog listing grid
│
├── components/                     # Modular UI building blocks (auto-imported by Nuxt!)
│   ├── layout/
│   │   ├── AppHeader.vue           # Top navbar, desktop/mobile dropdowns, `/videos` mobile quick-jump menu
│   │   ├── AppFooter.vue           # Navy footer, email signup input, social links bar
│   │   └── ScrollToTop.vue         # Floating bottom-right scroll-to-top button
│   ├── home/
│   │   ├── HeroSection.vue         # "شريكك الإبداعي" headline, bio, WhatsApp CTA, portrait & grid
│   │   ├── ViewsCounterSection.vue # Waves/rockets + animated 0 → 100,000,000 counter on scroll
│   │   ├── FeaturedVideoSlider.vue # Infinite MP4 teaser marquee + click-to-center Vimeo modal player
│   │   ├── StatsSection.vue        # +1000 videos, +30 clients, +06 countries cards
│   │   ├── ClientsMarquee.vue      # Dual-direction infinite marquees for companies & creators
│   │   ├── ServicesSection.vue     # `#my_services` Podcast/Shorts, Whiteboard/Collage/YouTube bento, CTAs
│   │   └── HomeBlogSection.vue     # "المدونة" heading + featured blog cards preview
│   ├── videos/
│   │   ├── VideoSectionHeader.vue  # Reusable category title + SVG backdrop + Arabic quote
│   │   ├── VimeoVideoCard.vue      # Reusable Vimeo player card (`short` 9:16 & `landscape` 16:9)
│   │   └── AiVideoCard.vue         # Reusable local auto-looping MP4 card (`short` & `landscape`)
│   └── blog/
│       └── BlogCard.vue            # Reusable blog card + glassmorphic "Coming Soon" modal
│
└── public/                         # Static files copied as-is to root URL `/` at build time
    ├── fonts/KoKhalaya-5-5.otf     # Custom Arabic display font ("fawzy")
    ├── images/                     # All SVGs, PNGs, JPGs (`/images/...`)
    ├── videos_thum/                # Home slider MP4 preview loops (`/videos_thum/1.mp4` – `5.mp4`)
    └── AI_videos/                  # AI section MP4 clips (`/AI_videos/1.mp4` – `6.mp4`)
```

---

## 3. How Nuxt Auto-Imports Component Names

Nuxt 3 automatically imports components from `components/` by combining their **folder path + filename** in PascalCase (you never need `import X from '...'` for components):

* `components/layout/AppHeader.vue` → `<LayoutAppHeader />`
* `components/home/HeroSection.vue` → `<HomeHeroSection />`
* `components/videos/VimeoVideoCard.vue` → `<VideosVimeoVideoCard />`
* `components/home/HomeBlogSection.vue` → `<HomeBlogSection />` *(Note: when folder name `home` matches filename prefix `Home`, Nuxt deduplicates the prefix instead of `<HomeHomeBlogSection />`!)*
* `components/blog/BlogCard.vue` → `<BlogCard />` *(Same deduplication rule: `blog` + `BlogCard` → `<BlogCard />`)*

---

## 4. Common Modification Recipes

### A. Add, Remove, or Reorder a Vimeo Video on `/videos`
Open `data/videos.ts` and edit `shortsVideos`, `youtubeVideos`, or `collageVideos`:

```ts
// Option 1: With a custom local thumbnail image in `public/images/...`
{ vimeoId: '1109992558', thumbnail: '/images/Shorts/17.jpg' }

// Option 2: Without a local image!
// `VimeoVideoCard.vue` will automatically call Vimeo's oEmbed API via Nuxt's `useFetch`
// (`composables/useVimeo.ts`) to fetch the official Vimeo cover image and title:
{ vimeoId: '1109992558' }
```

### B. Change Featured Videos on the Home Slider
1. Drop your short muted `.mp4` teaser preview in `public/videos_thum/` (e.g., `6.mp4`).
2. Add an entry to `featuredSliderVideos` in `data/videos.ts`:
   ```ts
   { vimeoId: 'YOUR_VIMEO_ID', teaserSrc: '/videos_thum/6.mp4' }
   ```
   *(The infinite slider's CSS track width automatically adjusts to `featuredSliderVideos.length`—no CSS math needed!)*

### C. Add a Client Logo or Creator Avatar
1. Put the image inside `public/images/company/` or `public/images/creator/`.
2. Append an object to `companyLogos` or `creatorAvatars` in `data/clients.ts`.
   *(Both marquee tracks automatically adjust their width to the array length.)*

### D. Update WhatsApp Number, Social Links, or 100M Views Counter
Open `data/site.ts` and edit `SITE_CONFIG` or `SOCIAL_LINKS`. Every button across the Header, Hero, Services, and Footer reads from `SITE_CONFIG`.

### E. Publish a Real Blog Article (Disable "Coming Soon" Popup)
In `data/blogs.ts`, add a `url` property to any post:
```ts
{
  id: 'start-video-editing-from-scratch',
  title: 'كيف تبدأ في مجال تحرير الفيديوهات من الصفر؟',
  excerpt: '...',
  image: '...',
  imageAlt: 'Color Grading',
  featuredOnHome: true,
  url: '/blog/start-video-editing', // <-- Internal route or external Medium/Substack URL
}
```
If you want full Markdown/HTML blog pages inside Nuxt later, simply create `pages/blog/[slug].vue`—Nuxt will automatically route `/blog/:slug` to that file!

### F. Edit Styles Safely (`<style scoped>`)
Every `.vue` component has three blocks:
1. `<script setup lang="ts">` — TypeScript state & data imports.
2. `<template>` — Clean HTML markup.
3. `<style scoped>` — Pure CSS that **only affects HTML inside this specific file**. You can change class styles in `HeroSection.vue` without worrying about accidentally breaking `ServicesSection.vue`!
* Global styles (font-face, CSS reset, `.container` widths) live in `assets/css/main.css`.

---

## 5. Running Locally & Deploying to Cloudflare Pages

### Local Development
```bash
cd nuxt-app
npm install
npm run dev
```
Open `http://localhost:3000` to view `/` (Home), `/videos`, and `/blog` with hot-reload.

### Build / Static Generation for Cloudflare Pages
`nuxt.config.ts` is pre-configured with `nitro: { preset: 'cloudflare-pages' }` and route prerendering.

* **Cloudflare Pages Dashboard Settings:**
  * **Root directory:** `nuxt-app` *(or `/` once you move `nuxt-app` contents to the repo root)*
  * **Build command:** `npm run generate` *(for 100% static prerendered HTML/assets)* or `npm run build` *(Cloudflare Pages preset)*
  * **Build output directory:** `dist`

---

## 6. Promoting `nuxt-app/` to Root (Once Verified)

Once you've verified everything works as expected and you're ready to delete the old Laravel files:
1. Delete the legacy Laravel folders (`app*`, `bootstrap*`, `config*`, `database*`, `public*`, `resources*`, `routes*`, `storage*`, `tests*`, `vendor`, `artisan`, `composer.*`, `phpunit.xml`, `vite.config.js`).
2. Move everything inside `nuxt-app/` (including `.gitignore`) up into the repository root `/Users/mostafa/Work/fawzy-website/`.
