import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import styles from './ProductSlider.module.scss';
import './../../styles/libs/_product_slider.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import 'swiper/css/thumbs';

import { FreeMode, Thumbs, Grid } from 'swiper/modules';

type Props = {
  images: string[];
};

export const ProductSlider: React.FC<Props> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={styles['product-slider']}>
      <div className={styles['product-slider__wrapper']}>
        <div className={styles.swiper__main}>
          <Swiper
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Thumbs]}
            className={styles.swiper__main_picture}
          >
            {images.map(image => (
              <SwiperSlide key={image}>
                <img
                  // eslint-disable-next-line max-len
                  src={image}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.swiper__wrapper__thumbs}>
          <Swiper
            onSwiper={swiper => {
              if (swiper && !swiper.destroyed) {
                setThumbsSwiper(swiper);
              }
            }}
            spaceBetween={5}
            slidesPerView={6}
            freeMode={true}
            modules={[Grid]}
            watchSlidesProgress={true}
            className={styles.swiper__thumb}
            breakpoints={{
              640: {
                grid: {
                  rows: 5,
                  fill: 'row',
                },
                slidesPerView: 1,
                spaceBetween: 5,
              },
            }}
          >
            {images.map(image => (
              <SwiperSlide
                key={image}
                className={`${styles.swiper__wrapper__small_thumb} swiper__thumbs`}
              >
                <img
                  // eslint-disable-next-line max-len
                  src={image}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
