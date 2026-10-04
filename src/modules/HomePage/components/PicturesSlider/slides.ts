export interface Slide {
  id: number;
  // image for tablet and desktop
  image: string;
  // optional square image for mobile (below 640px)
  mobileImage?: string;
  alt: string;
  to: string;
}

// Put your own pictures to public/img/banners and update this list
export const SLIDES: Slide[] = [
  {
    id: 1,
    image: 'img/banners/banner-1-desktop.webp',
    mobileImage: 'img/banners/banner-1-mobile.webp',
    alt: 'iPhone 14 Pro is now available in our store',
    to: '/phones',
  },
  {
    id: 2,
    image: 'img/banners/banner-2.webp',
    alt: 'Two iPhone 14 Pro in hands',
    to: '/phones',
  },
  {
    id: 3,
    image: 'img/banners/banner-3.webp',
    alt: 'Cases and accessories for iPhone',
    to: '/accessories',
  },
];
