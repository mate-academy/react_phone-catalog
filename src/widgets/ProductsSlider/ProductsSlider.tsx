'use client';

import 'swiper/css';

import { useCallback, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Product } from '@/entities/Product';
import { TranslationKey } from '@/shared/constants/translations';
import { useTranslation } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@/shared/ui/Icons';
import { H2 } from '@/shared/ui/Typography';
import { ProductCard } from '@/widgets/ProductCard';

interface ProductsSliderProps {
  title?: string;
  titleKey?: TranslationKey;
  products: Product[];
}

export const ProductsSlider = ({
  title,
  titleKey,
  products,
}: ProductsSliderProps) => {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigation = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handlePrevClick = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    swiper.slidePrev();
    updateNavigation(swiper);
  };

  const handleNextClick = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    swiper.slideNext();
    updateNavigation(swiper);
  };

  return (
    <section className="mx-auto w-full max-w-300 px-4 md:px-8">
      <div className="mb-6 flex items-end justify-between">
        <H2 className="text-brand-white">{titleKey ? t(titleKey) : title}</H2>

        <div className="z-10 flex gap-3">
          <Button
            variant="control"
            type="button"
            className="flex h-8 w-8 items-center justify-center"
            disabled={isBeginning}
            aria-label="Previous products"
            onClick={handlePrevClick}
          >
            <ChevronLeftIcon />
          </Button>

          <Button
            variant="control"
            type="button"
            className="flex h-8 w-8 items-center justify-center"
            disabled={isEnd}
            aria-label="Next products"
            onClick={handleNextClick}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <Swiper
        slidesPerView="auto"
        slidesPerGroup={1}
        spaceBetween={16}
        breakpoints={{
          768: {
            spaceBetween: 24,
          },
        }}
        loop={false}
        watchOverflow={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          requestAnimationFrame(() => {
            swiper.update();
            updateNavigation(swiper);
          });
        }}
        onAfterInit={(swiper) => {
          swiper.update();
          updateNavigation(swiper);
        }}
        onSlideChange={updateNavigation}
        onResize={(swiper) => {
          swiper.update();
          updateNavigation(swiper);
        }}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide
            key={`${product.itemId}-${product.id}`}
            className="w-53! md:w-59.25! lg:w-68!"
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
