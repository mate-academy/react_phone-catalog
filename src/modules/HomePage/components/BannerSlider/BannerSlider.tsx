import { useState } from 'react';
import type React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { asset } from '../../../../helper';
import styles from './BannerSlider.module.scss';
import { BANNER_SLIDES } from '../../../../constants/banner-slides';

export const BannerSlider: React.FC = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasControls = BANNER_SLIDES.length > 1;

  return (
    <section className={styles.slider}>
      <div className={styles.wrapper}>
        <Swiper
          modules={[Autoplay]}
          className={styles.swiper}
          slidesPerView={1}
          loop={hasControls}
          autoplay={
            hasControls ? { delay: 5000, disableOnInteraction: false } : false
          }
          onSwiper={setSwiper}
          onSlideChange={instance => setActiveIndex(instance.realIndex)}
        >
          {BANNER_SLIDES.map(slide => (
            <SwiperSlide key={slide.title}>
              <div
                className={styles.slide}
                style={
                  {
                    '--slide-image': `url(${asset(slide.image)})`,
                    '--slide-mobile-position': slide.mobilePosition,
                  } as React.CSSProperties
                }
              >
                <span className={styles.label}>{slide.label}</span>
                <h2 className={styles.title}>{slide.title}</h2>
                <Link to={slide.to} className={styles.button}>
                  Explore now
                  <span className={styles['button-icon']} aria-hidden="true">
                    <img src={asset('img/arrow-primary.svg')} alt="" />
                  </span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {hasControls && (
          <>
            <button
              type="button"
              className={classNames(styles.arrow, styles['arrow-prev'])}
              onClick={() => swiper?.slidePrev()}
            >
              <img src={asset('img/arrow-primary.svg')} alt="" />
            </button>
            <button
              type="button"
              className={classNames(styles.arrow, styles['arrow-next'])}
              onClick={() => swiper?.slideNext()}
            >
              <img src={asset('img/arrow-primary.svg')} alt="" />
            </button>
          </>
        )}
      </div>

      {hasControls && (
        <div className={styles.dots}>
          {BANNER_SLIDES.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={classNames(styles.dot, {
                [styles['dot-active']]: index === activeIndex,
              })}
              onClick={() => swiper?.slideToLoop(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
