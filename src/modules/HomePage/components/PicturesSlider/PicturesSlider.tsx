import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import cl from 'classnames';

import 'swiper/css';
import 'swiper/css/pagination';

import { ArrowLeftIcon } from '../../../../components/Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../../../components/Icons/ArrowRightIcon';
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
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <div className={styles.picturesSliderWrapper}>
      <button
        className={cl(styles.navButton, styles.navPrev)}
        ref={node => setPrevEl(node)}
      >
        <ArrowLeftIcon />
      </button>

      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          navigation={{
            prevEl,
            nextEl,
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <picture>
                <source
                  media="(min-width: 640px)"
                  srcSet={`${import.meta.env.BASE_URL}/${slide.desktopImg.replace(/^\//, '')}`}
                />

                <img
                  src={`${import.meta.env.BASE_URL}/${slide.mobileImg.replace(/^\//, '')}`}
                  alt={slide.alt}
                  className={styles.bannerImage}
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        className={cl(styles.navButton, styles.navNext)}
        ref={node => setNextEl(node)}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};
