import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import cl from 'classnames';

import 'swiper/css';
import 'swiper/css/pagination';

import { ArrowLeft } from '../../../../components/Icons/ArrowLeft';
import { ArrowRight } from '../../../../components/Icons/ArrowRight';
import styles from './PicturesSlider.module.scss';

const slides = [
  {
    id: 1,
    desktopImg: 'img/Banner.png',
    mobileImg: 'img/MobileBanner.png',
    alt: 'iPhone 14 Pro Banner',
  },
  {
    id: 2,
    desktopImg: 'img/banner-accessories.png',
    mobileImg: 'img/banner-accessories.png',
    alt: 'Tech accessories',
  },
  {
    id: 3,
    desktopImg: 'img/banner-phones.png',
    mobileImg: 'img/banner-phones.png',
    alt: 'Nice gadgets collection',
  },
];

export const PicturesSlider = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType>();

  return (
    <div className={styles.picturesSliderWrapper}>
      <div className={cl(styles.navButton, styles.navPrev)} ref={leftRef}>
        <ArrowLeft />
      </div>

      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          onBeforeInit={swiper => {
            swiperRef.current = swiper;
          }}
          navigation={{
            prevEl: leftRef.current,
            nextEl: rightRef.current,
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <picture>
                <source media="(min-width: 640px)" srcSet={slide.desktopImg} />

                <img
                  src={slide.mobileImg}
                  alt={slide.alt}
                  className={styles.bannerImage}
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={cl(styles.navButton, styles.navNext)} ref={rightRef}>
        <ArrowRight />
      </div>
    </div>
  );
};
