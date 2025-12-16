import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'

import styles from './PhoneSwiper.module.scss';
import Pic1 from './images/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907_Full-Bleed-Image.jpg.xlarge_2x.jpg';
import Pic2 from './images/image-17.png';
import Pic3 from './images/image-18.png';
import Button from './images/grey-bar.png';
import ArrowLeft from './images/arrow-left.png';
import ArrowRight from './images/arrow-right.png';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import './styles.css';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import type { NavigationOptions } from 'swiper/types';

export const PhoneSwiper: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [navigationConfig, setNavigationConfig] = useState<NavigationOptions>({});

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setNavigationConfig({
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      });
    }
  }, []);

  return (
    <div className={styles.swiper}>
      <button ref={prevRef} className={styles.swiper__button}>
        <img src={ArrowLeft} alt="Previous Slide" className={styles.swiper__button__arrow} />
      </button>

      <Swiper
        loop={true}
        navigation={navigationConfig}
        pagination={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className={styles.swiper__slide}
      >

          <SwiperSlide>
            <img src={Pic1} alt='Iphone 14Pro' className={styles.swiper__slide__img} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Pic2} alt='Iphone 14Pro' className={styles.swiper__slide__img} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Pic3} alt='Iphone 14Pro' className={styles.swiper__slide__img} />
          </SwiperSlide>
      </Swiper>

      <button ref={nextRef} className={styles.swiper__button}>
        <img src={ArrowRight} alt="Next Slide" className={styles.swiper__button__arrow} />
      </button>
    </div>
  );
}
