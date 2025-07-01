import React, { useRef, useEffect } from 'react';
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
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const navigation = swiperRef.current.navigation;

      if (navigation) {
        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;
        navigation.init();
        navigation.update();
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
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
