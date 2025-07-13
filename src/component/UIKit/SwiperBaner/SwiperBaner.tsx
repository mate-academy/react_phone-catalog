import React, { useRef, useEffect, useState } from 'react';
import style from './SwiperBaner.madule.scss';

import { Swiper as SwiperCore } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react';
import ArrowRight from '@/assets/icons/ArrowRight.svg?react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import bannerPhones from '../../../../public/img/Logo/baner-header.png';

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
    <div className={style.container}>
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: style.customBullet,
          bulletActiveClass: style.customBulletActive,
          renderBullet: function (_index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation]}
        className={style.mySwiper}
      >
        <SwiperSlide className={style.swiperSlide}>
          <img
            src={bannerPhones}
            alt="Phones banner"
            className={style.swiperImage}
          />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <img
            src={bannerPhones}
            alt="Accessories banner"
            className={style.swiperImage}
          />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>
          <img
            src={bannerPhones}
            alt="Tablets banner"
            className={style.swiperImage}
          />
        </SwiperSlide>
      </Swiper>

      <button
        ref={prevRef}
        className={`${style.customNavBtn} ${style.customNavPrev}`}
      >
        <ArrowLeft className={style.arrowLeft} />
      </button>
      <button
        ref={nextRef}
        className={`${style.customNavBtn} ${style.customNavNext}`}
      >
        <ArrowRight className={style.arrowRight} />
      </button>
    </div>
  );
};
