import type { Banner } from '../types';

const BANNER_BASE_PATH = 'https://ik.imagekit.io/ox4rssyih/img/banner';

export const BANNERS: Banner[] = [
  {
    id: 1,
    images: {
      mobile: `${BANNER_BASE_PATH}/mobileBanner1.webp`,
      tablet: `${BANNER_BASE_PATH}/bannerTablet1.webp`,
      desktop: `${BANNER_BASE_PATH}/tetsbanner1.webp`,
    },
    alt: 'Independence Day',
  },
  {
    id: 2,
    images: {
      mobile: `${BANNER_BASE_PATH}/mobileBanner2.webp`,
      tablet: `${BANNER_BASE_PATH}/bannerTablet2.webp`,
      desktop: `${BANNER_BASE_PATH}/testbanner22.webp`,
    },
    alt: 'New books',
  },
  {
    id: 3,
    images: {
      mobile: `${BANNER_BASE_PATH}/mobileBanner3.webp`,
      tablet: `${BANNER_BASE_PATH}/bannerTablet3.webp`,
      desktop: `${BANNER_BASE_PATH}/testbanner3.webp`,
    },
    alt: 'Recommendations',
  },
];
