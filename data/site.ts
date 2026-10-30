/**
 * Site-wide Configuration & Links (`data/site.ts`)
 * ------------------------------------------------
 * Modify phone numbers, social media URLs, bio text, or navigation links here
 * and they will automatically update in the Header, Hero, Services, and Footer.
 */

export interface PortfolioCategoryLink {
  /** Hash anchor ID matching the <section id="..."> in `pages/videos.vue` */
  hash: string
  /** Label shown in header dropdown */
  dropdownLabel: string
  /** Label shown in the mobile floating quick-jump menu on `/videos` */
  floatingLabel: string
  /** Font Awesome icon class */
  icon: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  rightsMark?: boolean
}

export const SITE_CONFIG = {
  name: 'محمود فوزي',
  shortTitle: 'Fawzy',
  whatsappUrl:
    'https://api.whatsapp.com/send/?phone=%2B201028654568&text&type=phone_number&app_absent=0',
  youtubeChannelUrl: 'https://www.youtube.com/@mahmoudfawzyofficial',
  totalViewsCount: 100_000_000,
  footerBio:
    'محرر فيديو محترف بخبرة تزيد عن 5 سنوات في مجال إنتــــــــــــاج المحتــــــــوى المـــــــــــرئي والمــــونتاج و عمـــــــــلت مــــــــع العديد من المؤسسات الكبرى وصناع المحتوى في الوطن العربي والعالم',
} as const

/** Sub-categories under "أعمالي" (Portfolio) */
export const PORTFOLIO_CATEGORIES: PortfolioCategoryLink[] = [
  {
    hash: '#Shorts',
    dropdownLabel: 'Shorts',
    floatingLabel: 'Shorts',
    icon: 'fa-solid fa-film',
  },
  {
    hash: '#Youtube',
    dropdownLabel: 'Youtube',
    floatingLabel: 'Youtube Videos',
    icon: 'fa-solid fa-file-video',
  },
  {
    hash: '#Collage',
    dropdownLabel: 'Collage',
    floatingLabel: 'Collage Art Animation',
    icon: 'fa-solid fa-clapperboard',
  },
  {
    hash: '#with_Ai',
    dropdownLabel: 'with Ai',
    floatingLabel: 'Made with AI',
    icon: 'fa-solid fa-clapperboard',
  },
]

/** Social media icons in the bottom sub-footer */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/fawzy14/',
    icon: 'fa-brands fa-linkedin',
    rightsMark: true,
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@fawzy.14?lang=en',
    icon: 'fa-brands fa-tiktok',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/fawzy.14/',
    icon: 'fa-brands fa-instagram',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/MahFawzy14',
    icon: 'fa-brands fa-facebook',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@mahmoudfawzyofficial',
    icon: 'fa-brands fa-youtube',
  },
]
