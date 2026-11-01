// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

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
        { property: 'og:image', content: '/images/meta_logo.jpg' },
        { property: 'og:type', content: 'website' },
        // Twitter Card Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'محمود فوزي' },
        {
          name: 'twitter:description',
          content:
            'محرر فيديو محترف بخبرة تزيد عن 5 سنوات في مجال إنتــــــــــــاج المحتــــــــوى المـــــــــــرئي والمــــونتاج و عمـــــلت مـــع العديد من المؤسسات الكبرى وصناع المحتوى في الوطن العربي والعالم',
        },
        { name: 'twitter:image', content: '/images/meta_logo.jpg' },
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
        // Font Awesome 6 icons (used in nav dropdowns, video play badges, social footer)
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
          integrity:
            'sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer',
        },
        // AOS (Animate On Scroll) stylesheet
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css',
        },
      ],
      script: [
        // Vimeo Player JS SDK (controls play/pause/volume of embedded Vimeo iframes)
        {
          src: 'https://player.vimeo.com/api/player.js',
          defer: true,
        },
        // AOS (Animate On Scroll) library
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js',
          defer: true,
        },
      ],
    },
  },
})
