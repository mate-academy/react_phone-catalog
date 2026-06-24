/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import React from 'react';
import styles from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const Slider = () => {
  const slides = [
    'img/banners/baner.jpg',
    'img/banners/Apple.jpg',
    'img/banners/ipadT.jpg',
    'img/banners/awT.jpg',
  ];

  return (
    <div className={styles.header}>
      <div className={styles.header__block}>
        <p className={styles.header__title}>Welcome to Nice Gadgets store!</p>
      </div>

      <section className={styles.banner}>
        <div className={styles.banner__controls}>
          <button
            type="button"
            className={`${styles.banner__button} ${styles['banner__button--prev']} js-banner-prev`}
            aria-label="Previous picture"
          >
            ❮
          </button>

          <Swiper
            className={styles.banner__container}
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: '.js-banner-prev',
              nextEl: '.js-banner-next',
            }}
            pagination={{ el: '.custom-pagination', clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            slidesPerView={1}
            observer
            observeParents
            resizeObserver
            speed={1000}
          >
            {slides.map((src, i) => (
              <SwiperSlide key={src} className={styles.banner__slider}>
                <img
                  src={src}
                  alt={`Promo ${i + 1}`}
                  className={styles.banner__img}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className={`${styles.banner__button} ${styles['banner__button--next']} js-banner-next`}
            aria-label="Next picture"
          >
            ❯
          </button>
        </div>

        <div className="custom-pagination" />
      </section>
    </div>
  );
};
