import React, { useEffect, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AsyncData } from '../AsyncData';
import { useProducts } from '@/shared/context/ProductsContext';

import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';

import { Product } from '@/shared/types';

import { IconButton } from '../Buttons/components/IconButton';
import { ProductCard } from '../ProductCard';

import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';
import { ArrowIcon } from '@/shared/assets/icons';

import cn from 'classnames';
import './ProductsSlider.scss';

type Props = {
  className?: string;
  title: string;
  products: Product[] | null;
  onRetry: () => void;
};

export const ProductsSlider: React.FC<Props> = ({
  className,
  title,
  products,
  onRetry,
}) => {
  const { hasError, isLoading } = useProducts();
  const isOnline = useOnlineStatus();

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  useEffect(() => {
    if (swiperInstance && !isLoading && products?.length) {
      swiperInstance.update();
      updateNavState(swiperInstance);
    }
  }, [swiperInstance, isLoading, products]);

  return (
    <section className={cn('products-slider', className)}>
      <div className="products-slider__header">
        <h2 className="products-slider__title">{title}</h2>
        {!hasError &&
          isOnline &&
          (isLoading ? (
            <div className="products-slider__navigation-skeleton" />
          ) : (
            <div className="products-slider__navigation">
              <IconButton
                className="products-slider__btn products-slider__btn--prev"
                aria-label="Previous slide"
                onClick={() => swiperInstance?.slidePrev()}
                disabled={isBeginning || !swiperInstance}
              >
                <ArrowIcon className="products-slider__icon" />
              </IconButton>

              <IconButton
                className="products-slider__btn products-slider__btn--next"
                aria-label="Next slide"
                onClick={() => swiperInstance?.slideNext()}
                disabled={isEnd || !swiperInstance}
              >
                <ArrowIcon className="products-slider__icon" />
              </IconButton>
            </div>
          ))}
      </div>

      <div className="products-slider__swiper-wrapper">
        <AsyncData onRetry={onRetry} hasError={hasError}>
          <Swiper
            onSwiper={swiper => {
              setSwiperInstance(swiper);
              updateNavState(swiper);
            }}
            onSlideChange={updateNavState}
            observer={true}
            observeParents={true}
            roundLengths={true}
            onReachEnd={() => setIsEnd(true)}
            onReachBeginning={() => setIsBeginning(true)}
            breakpoints={{
              320: { slidesPerView: 'auto' },
              640: { slidesPerView: 'auto' },
              1200: { slidesPerView: 4 },
            }}
            spaceBetween={16}
            className="products-slider__swiper"
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SwiperSlide className="products-slider__slide" key={index}>
                    <ProductCardSkeleton />
                  </SwiperSlide>
                ))
              : (products ?? []).map(product => (
                  <SwiperSlide
                    className="products-slider__slide"
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </AsyncData>
      </div>
    </section>
  );
};
