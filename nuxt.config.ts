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
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Google Fonts: IBM Plex Sans Arabic + Montserrat
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
        },
        // AOS (Animate On Scroll) stylesheet
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css',
        },
      ],
      script: [
        // AOS (Animate On Scroll) library
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js',
          defer: true,
        },
      ],
    },
  },
})
