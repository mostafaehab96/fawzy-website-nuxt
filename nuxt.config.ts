// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL || 'https://fawzy-website-nuxt.pages.dev'
).replace(/\/+$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  // Disable the floating Nuxt DevTools badge at the bottom in `npm run dev`
  // (Set back to `true` anytime if you want to inspect Vue components/routes)
  devtools: { enabled: false },

  // Global stylesheet loaded on every page (fonts, CSS reset, .container layout)
  css: ['~/assets/css/main.css'],

  // Serve a single immutable cached `/_nuxt/style.<hash>.css` (`~11 KB` Brotli)
  // rather than duplicating 87 KB of inline `<style>` tags in every HTML file AND
  // triggering Vite's post-hydration `<link rel="stylesheet">` re-fetch.
  features: {
    inlineStyles: false,
  },
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },

  // Cloudflare Pages deployment configuration
  // Run `npm run generate` (pure static) or `npm run build` (Cloudflare Pages preset)
  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/videos', '/blog'],
      autoSubfolderIndex: false,
    },
  },

  routeRules: {
    '/**': {
      headers: {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'X-Frame-Options': 'SAMEORIGIN',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
    '/fonts/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
    '/images/**': {
      headers: {
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    },
    '/videos_thum/**': {
      headers: {
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    },
    '/AI_videos/**': {
      headers: {
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    },
  },

  // Global <head> tags (SEO metadata, Google Fonts, FontAwesome icons, Vimeo & AOS scripts)
  // NOTE: Do NOT set `dir: 'rtl'` globally on htmlAttrs because individual CSS sections
  // explicitly opt into `direction: rtl` while infinite carousels rely on default LTR coordinates.
  app: {
    head: {
      htmlAttrs: {
        lang: 'ar',
      },
      title: 'Fawzy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        {
          name: 'description',
          content:
            'محرر فيديو محترف بخبرة تزيد عن 5 سنوات في مجال إنتاج المحتوى المرئي والمونتاج وعملت مع العديد من المؤسسات الكبرى وصناع المحتوى في الوطن العربي والعالم',
        },
        // Open Graph Meta Tags
        { property: 'og:title', content: 'محمود فوزي' },
        {
          property: 'og:description',
          content:
            'محرر فيديو محترف بخبرة تزيد عن 5 سنوات في مجال إنتــــــــــــاج المحتــــــــوى المـــــــــــرئي والمــــونتاج و عمـــــلت مـــع العديد من المؤسسات الكبرى وصناع المحتوى في الوطن العربي والعالم',
        },
        { property: 'og:image', content: `${siteUrl}/images/meta_logo.jpg` },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '1200' },
        { property: 'og:type', content: 'website' },
        // Twitter Card Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'محمود فوزي' },
        {
          name: 'twitter:description',
          content:
            'محرر فيديو محترف بخبرة تزيد عن 5 سنوات في مجال إنتــــــــــــاج المحتــــــــوى المـــــــــــرئي والمــــونتاج و عمـــــلت مـــع العديد من المؤسسات الكبرى وصناع المحتوى في الوطن العربي والعالم',
        },
        { name: 'twitter:image', content: `${siteUrl}/images/meta_logo.jpg` },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/logo_svg.svg' },
        {
          rel: 'preload',
          href: '/fonts/ibm-plex-sans-arabic-600-arabic.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/fonts/ibm-plex-sans-arabic-700-arabic.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
})
