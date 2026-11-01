/**
 * Clients & Content Creators Marquee Data (`data/clients.ts`)
 * -----------------------------------------------------------
 * Used by `components/home/ClientsMarquee.vue` on the Home page.
 * Adding or removing items here automatically recalculates the infinite
 * marquee track width—no manual DOM cloning or CSS edits needed.
 */

export interface CompanyLogoItem {
  /** Optional CSS modifier class for custom logo aspect ratio/invert filter */
  className?: string
  src: string
  alt: string
}

export interface CreatorAvatarItem {
  src: string
  alt: string
}

/** Row 1: Organizations & Companies (scrolls right-to-left) */
export const companyLogos: CompanyLogoItem[] = [
  {
    className: 'akhdar_img',
    src: '/images/company/akhdar.webp',
    alt: 'أخضر',
  },
  {
    className: 'ethad_img',
    src: '/images/company/ethad_s3ody.webp',
    alt: 'الاتحاد الرياضي السعودي للجامعات',
  },
  {
    className: 'KimCam_img',
    src: '/images/company/KimCam.webp',
    alt: 'KimCam Academy',
  },
  {
    className: 'Soor_img',
    src: '/images/company/Soor.webp',
    alt: 'Soor',
  },
  {
    className: 'gahezia_img',
    src: '/images/company/gahezia.webp',
    alt: 'جاهزية المليار',
  },
  {
    className: 'had_img',
    src: '/images/company/had.webp',
    alt: 'هاد للدعوة والإرشاد',
  },
  {
    className: 'qasem_img',
    src: '/images/company/qasem.webp',
    alt: 'جامعة القصيم',
  },
  {
    className: 'shorta_img',
    src: '/images/company/shorta_sharqa.webp',
    alt: 'القيادة العامة لشرطة الشارقة',
  },
  {
    className: 'lifestyle_img',
    src: '/images/company/horizontal_logo.webp',
    alt: 'Lifestyle',
  },
]

/** Row 2: Content Creators (scrolls left-to-right in circular frames) */
export const creatorAvatars: CreatorAvatarItem[] = [
  { src: '/images/creator/abd_alrahman.webp', alt: 'Abd Alrahman' },
  { src: '/images/creator/abo_bakr.webp', alt: 'Abo Bakr' },
  { src: '/images/creator/al_ghafes.webp', alt: 'Al Ghafes' },
  { src: '/images/creator/ayman.webp', alt: 'Ayman' },
  { src: '/images/creator/fas.webp', alt: 'Fas' },
  { src: '/images/creator/feqy.webp', alt: 'Feqy' },
  { src: '/images/creator/gel_yaqraa.webp', alt: 'Gel Yaqraa' },
  { src: '/images/creator/omar_abd_alrahem.webp', alt: 'Omar Abd Alrahem' },
  { src: '/images/creator/saleh.webp', alt: 'Saleh' },
]
