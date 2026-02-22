import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './Banner.module.scss';
import { BannerItem } from './BannerItem';
import { BANNERS } from '../../constants/constJS';
import React, { useRef, useState } from 'react';

const initializeSwiperNavigation = (
  swiper: SwiperType,
  prevRef: React.RefObject<HTMLDivElement>,
  nextRef: React.RefObject<HTMLDivElement>,
) => {
  if (swiper.params.navigation) {
    const nav = swiper.params.navigation as {
      prevEl: HTMLElement | null;
      nextEl: HTMLElement | null;
    };

    nav.prevEl = prevRef.current;
    nav.nextEl = nextRef.current;
  }
};

export const Banner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.banner}>
      <div className={`${styles.bannerContainer} swiper-container`}>
        <div className={styles.swiperButtonPrevCustom} ref={prevRef}></div>
        <div className={styles.swiperButtonNextCustom} ref={nextRef}></div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={swiper =>
            initializeSwiperNavigation(swiper, prevRef, nextRef)
          }
          onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
          autoplay={false}
          speed={500}
          loop={true}
        >
          {BANNERS.map((_, index) => (
            <SwiperSlide key={index}>
              <div className={styles.swiperHeight} />
            </SwiperSlide>
          ))}
        </Swiper>

        <BannerItem activeIndex={activeIndex} />
      </div>
    </div>
  );
};
