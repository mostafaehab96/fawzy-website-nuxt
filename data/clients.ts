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
    src: '/images/company/akhdar.png',
    alt: 'أخضر',
  },
  {
    className: 'ethad_img',
    src: '/images/company/ethad_s3ody.png',
    alt: 'الاتحاد الرياضي السعودي للجامعات',
  },
  {
    className: 'KimCam_img',
    src: '/images/company/KimCam.png',
    alt: 'KimCam Academy',
  },
  {
    className: 'Soor_img',
    src: '/images/company/Soor.png',
    alt: 'Soor',
  },
  {
    className: 'gahezia_img',
    src: '/images/company/gahezia.png',
    alt: 'جاهزية المليار',
  },
  {
    className: 'had_img',
    src: '/images/company/had.png',
    alt: 'هاد للدعوة والإرشاد',
  },
  {
    className: 'qasem_img',
    src: '/images/company/qasem.png',
    alt: 'جامعة القصيم',
  },
  {
    className: 'shorta_img',
    src: '/images/company/shorta_sharqa.png',
    alt: 'القيادة العامة لشرطة الشارقة',
  },
  {
    className: 'lifestyle_img',
    src: '/images/company/Horizontal Logo.png',
    alt: 'Lifestyle',
  },
]

/** Row 2: Content Creators (scrolls left-to-right in circular frames) */
export const creatorAvatars: CreatorAvatarItem[] = [
  { src: '/images/creator/abd_alrahman.jpg', alt: 'Abd Alrahman' },
  { src: '/images/creator/abo_bakr.jpg', alt: 'Abo Bakr' },
  { src: '/images/creator/al_ghafes.jpg', alt: 'Al Ghafes' },
  { src: '/images/creator/ayman.jpg', alt: 'Ayman' },
  { src: '/images/creator/fas.jpg', alt: 'Fas' },
  { src: '/images/creator/feqy.jpg', alt: 'Feqy' },
  { src: '/images/creator/gel_yaqraa.jpg', alt: 'Gel Yaqraa' },
  { src: '/images/creator/omar_abd_alrahem.jpg', alt: 'Omar Abd Alrahem' },
  { src: '/images/creator/saleh.jpg', alt: 'Saleh' },
]
