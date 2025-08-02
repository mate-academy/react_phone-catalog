import React from 'react';
import styles from './MainSlider.module.scss';
import { ArrowButton } from '../../../../shared/atoms/ArrowButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ResponsiveImage } from '../../../../shared/atoms/ResponsiveImage';
import classNames from 'classnames';

export const MainSlider: React.FC = () => {
  return (
    <div className={styles.slider}>
      <ArrowButton
        direction="left"
        data-main-slider-prev
        className={styles.sliderButton}
        fullHeight
        fullWidth
      />

      <div className={styles.sliderContent}>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation={{
            nextEl: '[data-main-slider-next]',
            prevEl: '[data-main-slider-prev]',
          }}
          loop
          pagination={{
            el: '[data-main-slider-pagination]',
            clickable: true,
            renderBullet: (_, className) => {
              return `<span class="${classNames(className, styles.slider__pagination__bullet)}"></span>`;
            },
          }}
          rewind
          className={styles.swiper}
        >
          <SwiperSlide>
            <ResponsiveImage
              alt="Phone advertisement"
              desktopSrc="images/banner-slider-1-desktop.png"
              tabletSrc="images/banner-slider-1-desktop.png"
              mobileSrc="images/banner-slider-1-mobile.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ResponsiveImage
              alt="Phone advertisement"
              desktopSrc="images/banner-slider-2-desktop.png"
              tabletSrc="images/banner-slider-2-desktop.png"
              mobileSrc="images/banner-slider-2-mobile.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ResponsiveImage
              alt="Phone advertisement"
              desktopSrc="images/banner-slider-3-desktop.png"
              tabletSrc="images/banner-slider-3-desktop.png"
              mobileSrc="images/banner-slider-3-mobile.png"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <ArrowButton
        direction="right"
        data-main-slider-next
        className={styles.sliderButton}
        fullHeight
        fullWidth
      />
      <div
        className={styles.slider__pagination}
        data-main-slider-pagination
      ></div>
    </div>
  );
};
