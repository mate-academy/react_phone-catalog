import type { BannerImages } from '../types';

interface SlideImageProps {
  images: BannerImages;
  alt: string;
  isActive: boolean;
}

export const SlideImage = ({ images, alt, isActive }: SlideImageProps) => (
  <div
    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
      isActive ? 'opacity-100 z-20' : 'opacity-0 z-10'
    }`}
  >
    <picture>
      <source
        media="(min-width: 1024px)"
        srcSet={images.desktop}
      />
      <source
        media="(min-width: 640px)"
        srcSet={images.tablet}
      />
      <img
        src={images.mobile}
        alt={alt}
        className="object-cover w-full h-full min-[640px]:rounded-[24px]"
      />
    </picture>
  </div>
);
