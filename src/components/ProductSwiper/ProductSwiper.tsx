/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import 'swiper/css';
import 'swiper/css/navigation';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay, Mousewheel } from 'swiper/modules';

import styles from './ProductSwiper.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { SkeletonProductCard } from '../../Skeletons/SkeletonProductCard';
import classNames from 'classnames';
import { SwiperOptions } from 'swiper/types';

type Props = {
  items: Product[];
  isLoading: boolean;
  title: string;
  isScrollAuto?: boolean;
};

const autoplayConfig = {
  delay: 3000,
  disableOnInteraction: false,
};

export const bannerSwiperConfig: SwiperOptions = {
  modules: [Navigation, Autoplay, Mousewheel],
  slidesPerView: 1.3,
  spaceBetween: 16,
  loop: false,
  mousewheel: {
    forceToAxis: true,
    sensitivity: 1,
  },
  breakpoints: {
    640: { slidesPerView: 2.5 },
    1024: { slidesPerView: 4 },
  },
};

const ProductSwiperComponent: React.FC<Props> = ({
  items,
  isLoading,
  title,
  isScrollAuto = false,
}) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const syncNavState = useCallback((swiper: SwiperType) => {
    setIsPrevDisabled(swiper.isBeginning);
    setIsNextDisabled(swiper.isEnd);
  }, []);

  useEffect(() => {
    if (!swiperRef.current) {
      return;
    }

    const swiper = swiperRef.current;

    requestAnimationFrame(() => {
      swiper.update();
      swiper.navigation.update();
      syncNavState(swiper);
    });
  }, [items.length, syncNavState]);

  return (
    <section className={styles.productSwiper}>
      <div className={styles.productSwiper__header}>
        <h2 className={styles.productSwiper__title}>{title}</h2>

        <div className={styles.productSwiper__controls}>
          <button
            ref={prevRef}
            disabled={isPrevDisabled}
            aria-disabled={isPrevDisabled}
            className={classNames(
              'button button--small',
              isPrevDisabled ? 'button--disabled' : 'button--icon',
            )}
          >
            <span
              className={classNames(
                'icon icon--rotate180',
                isPrevDisabled
                  ? 'icon--chevron-disabled'
                  : 'icon--chevron-active',
              )}
            />
          </button>

          <button
            ref={nextRef}
            disabled={isNextDisabled}
            aria-disabled={isNextDisabled}
            className={classNames(
              'button button--small',
              isNextDisabled ? 'button--disabled' : 'button--icon',
            )}
          >
            <span
              className={classNames(
                'icon',
                isNextDisabled
                  ? 'icon--chevron-disabled'
                  : 'icon--chevron-active',
              )}
            />
          </button>
        </div>
      </div>

      <Swiper
        {...bannerSwiperConfig}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={isScrollAuto ? autoplayConfig : false}
        onSlideChange={swiper => {
          syncNavState(swiper);
        }}
        onResize={swiper => {
          syncNavState(swiper);
        }}
      >
        {!isLoading &&
          items.map(item => (
            <SwiperSlide key={item.id}>
              <div className={styles.productSwiper__slide}>
                <ProductCard product={item} />
              </div>
            </SwiperSlide>
          ))}

        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <SwiperSlide key={i}>
              <SkeletonProductCard />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export const ProductSwiper = React.memo(ProductSwiperComponent);
