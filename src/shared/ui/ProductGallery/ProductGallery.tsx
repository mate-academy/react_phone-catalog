'use client';

import 'swiper/css';

import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BASE_URL } from '@/shared/constants/constant';
import { cn } from '@/shared/lib';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start w-full min-w-0">
      <div className="flex flex-row gap-2 overflow-x-auto sm:flex-col sm:gap-2 sm:shrink-0">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => handleThumbnailClick(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              'relative size-15 shrink-0 border transition-colors duration-300 cursor-pointer',
              i === activeIndex
                ? 'border-brand-white'
                : 'border-brand-elements hover:border-brand-secondary',
            )}
          >
            <Image
              src={`${BASE_URL}/${src}`}
              alt={`${name} thumbnail ${i + 1}`}
              fill
              className="object-contain p-1"
              sizes="60px"
            />
          </button>
        ))}
      </div>

      <div className="relative w-full aspect-square min-w-0">
        <Swiper
          className="h-full w-full"
          slidesPerView={1}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {images.map((src, i) => (
            <SwiperSlide key={src} className="relative w-full h-full">
              <Image
                src={`${BASE_URL}/${src}`}
                alt={`${name} - image ${i + 1}`}
                fill
                priority={i === 0}
                className="object-contain"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
