export interface BannerImages {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Banner {
  id: number;
  images: BannerImages;
  alt: string;
}

export type NavigationDirection = 'previous' | 'next';
