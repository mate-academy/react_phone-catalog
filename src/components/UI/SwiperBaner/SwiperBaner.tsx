import React, { useRef, useEffect, useState } from 'react';
import styles from './SwiperBaner.module.scss';

import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react';
import ArrowRight from '@/assets/icons/ArrowRight.svg?react';

import bannerPhones from '/img/banner-phones.png';
import bannerAccessories from '/img/banner-accessories.png';
import bannerTablets from '/img/banner-tablets.png';

import { Swiper as SwiperCore } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const SwiperBaner: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  useEffect(() => {
    if (swiper && !swiper.destroyed) {
      if (
        swiper.params.navigation &&
        typeof swiper.params.navigation !== 'boolean'
      ) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
      }

      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <div className={styles.container}>
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: styles.customBullet,
          bulletActiveClass: styles.customBulletActive,
          renderBullet: function (_index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.mySwiper}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <img
            src={bannerPhones}
            alt="Phones banner"
            className={styles.swiperImage}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img
            src={bannerAccessories}
            alt="Accessories banner"
            className={styles.swiperImage}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img
            src={bannerTablets}
            alt="Tablets banner"
            className={styles.swiperImage}
          />
        </SwiperSlide>
      </Swiper>

      <button
        ref={prevRef}
        className={`${styles.customNavBtn} ${styles.customNavPrev}`}
      >
        <ArrowLeft className={styles.arrowLeft} />
      </button>
      <button
        ref={nextRef}
        className={`${styles.customNavBtn} ${styles.customNavNext}`}
      >
        <ArrowRight className={styles.arrowRight} />
      </button>
    </div>
  );
};
