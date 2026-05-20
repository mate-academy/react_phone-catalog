import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MainSlider.module.scss';
import { ArrowButton } from '../../../../shared/atoms/ArrowButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ResponsiveImage } from '../../../../shared/atoms/ResponsiveImage';
import classNames from 'classnames';

export const MainSlider: React.FC = () => {
  const { t } = useTranslation();
  const bannerAlt = t('alt.banner');

  return (
    <div className={styles.slider}>
      <ArrowButton
        direction="left"
        data-main-slider-prev
        className={styles.sliderButton}
        fullHeight
      />

      <div className={styles.sliderContent}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation={{
            nextEl: '[data-main-slider-next]',
            prevEl: '[data-main-slider-prev]',
          }}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
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
              alt={bannerAlt}
              desktopSrc="images/banner-slider-1-desktop.png"
              tabletSrc="images/banner-slider-1-desktop.png"
              mobileSrc="images/banner-slider-1-mobile.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ResponsiveImage
              alt={bannerAlt}
              desktopSrc="images/banner-slider-2-desktop.png"
              tabletSrc="images/banner-slider-2-desktop.png"
              mobileSrc="images/banner-slider-2-mobile.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ResponsiveImage
              alt={bannerAlt}
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
      />
      <div
        className={styles.slider__pagination}
        data-main-slider-pagination
      ></div>
    </div>
  );
};
