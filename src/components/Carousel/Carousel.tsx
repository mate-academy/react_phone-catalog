import React, { ReactNode, useRef, useEffect } from 'react';
import styles from './Carousel.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import type { SwiperRef } from 'swiper/react';
import type { NavigationOptions } from 'swiper/types';

interface CarouselProps {
  children: ReactNode;
  title: string;
}

export const Carousel: React.FC<CarouselProps> = ({ children, title }) => {
  const swiperRef = useRef<SwiperRef | null>(null);

  const uniqueIdRef = useRef(
    `carousel-${Math.random().toString(36).substr(2, 9)}`,
  );
  const prevButtonClass = `prev-${uniqueIdRef.current}`;
  const nextButtonClass = `next-${uniqueIdRef.current}`;

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (
      swiper &&
      swiper.params.navigation &&
      typeof swiper.params.navigation !== 'boolean'
    ) {
      const navParams = swiper.params.navigation as NavigationOptions;

      navParams.prevEl = `.${prevButtonClass}`;
      navParams.nextEl = `.${nextButtonClass}`;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [prevButtonClass, nextButtonClass]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttonsBlock}>
          <div className={styles.buttonContainer}>
            <button className={`${styles.buttonPrev} ${prevButtonClass}`}>
              <div className={styles.prev}></div>
            </button>
          </div>

          <div className={styles.buttonContainer}>
            <button className={`${styles.buttonNext} ${nextButtonClass}`}>
              <div className={styles.next}></div>
            </button>
          </div>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        slidesPerView={1.36}
        spaceBetween={16}
        className={styles.productSwiper}
        breakpoints={{
          640: {
            slidesPerView: 2.44,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
