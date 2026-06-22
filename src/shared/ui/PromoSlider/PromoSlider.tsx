'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/shared/ui/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@/shared/ui/Icons';

interface Slide {
  src: string;
  srcLight: string;
  alt: string;
  href: string;
}

interface PromoSliderProps {
  slides: Slide[];
}

export const PromoSlider = ({ slides }: PromoSliderProps) => {
  if (!slides.length) return null;

  return (
    <div className="flex items-stretch w-full gap-4 justify-center md:w-148 lg:w-284">
      <Button
        variant="control"
        className="hidden sm:flex custom-prev w-8 h-full items-center justify-center cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6 text-brand-white" />
      </Button>

      <Swiper
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-promo-bullet',
          bulletActiveClass: 'swiper-promo-bullet-active',
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        slidesPerView={1}
        loop={true}
        className="
            w-full h-80 md:h-47.25 lg:h-100 relative
            [&_.swiper-promo-bullet]:inline-block
            [&_.swiper-promo-bullet]:w-4
            [&_.swiper-promo-bullet]:h-1.5
            [&_.swiper-promo-bullet]:bg-brand-elements
            [&_.swiper-promo-bullet]:mx-0.5
            [&_.swiper-promo-bullet]:cursor-pointer
            [&_.swiper-promo-bullet]:transition-all
            [&_.swiper-promo-bullet]:duration-300
            [&_.swiper-promo-bullet-active]:w-8
            [&_.swiper-promo-bullet-active]:bg-brand-accent
            [&_.swiper-pagination]:bottom-2
          "
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.src}>
            <Link
              href={slide.href}
              className="w-full h-full flex items-center justify-center bg-brand-black relative"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-top block in-[.light]:hidden"
                priority
              />

              <Image
                src={slide.srcLight}
                alt={slide.alt}
                fill
                className="object-cover object-top hidden in-[.light]:block"
                priority
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        variant="control"
        className="hidden sm:flex custom-next w-8 h-full items-center justify-center cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6 text-brand-white" />
      </Button>
    </div>
  );
};
