import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Zoom } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ImageWithSkeleton } from '@/components/ui/ImageWithSkeleton';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

interface ItemCardGalleryProps {
  images: string[];
}

export const ItemCardGallery: React.FC<ItemCardGalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex flex-col-reverse sm:flex-row items-start w-full gap-4">
      <div className="w-full sm:w-20">
        <Swiper
          className="mx-auto h-20 sm:h-130"
          onSwiper={setThumbsSwiper}
          modules={[Thumbs, FreeMode]}
          freeMode
          watchSlidesProgress
          spaceBetween={8}
          breakpoints={{
            0: { direction: 'horizontal', slidesPerView: 3 },
            360: { direction: 'horizontal', slidesPerView: 4 },
            640: { direction: 'vertical', slidesPerView: 6 },
          }}
        >
          {images.map((source, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-20 h-20 flex items-center justify-center rounded-lg border border-border hover:border-foreground dark:bg-white/20 dark:border-white/20 dark:hover:bg-white/40 transition-all">
                <ImageWithSkeleton
                  src={source}
                  alt={`thumbnail ${index + 1}`}
                  className="w-16 h-16 object-contain rounded-md cursor-pointer"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Zoom]}
        zoom={true}
        className="w-full aspect-4/5 sm:h-130 flex-1 min-w-0"
      >
        {images.map((source, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container relative w-full h-full flex items-center justify-center rounded-md cursor-zoom-in">
              <ImageWithSkeleton
                src={source}
                alt={`image ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
