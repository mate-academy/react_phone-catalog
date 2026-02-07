import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './HeroSlider.module.scss';

const slides = [
  {
    id: 1,
    image: 'img/phones/apple-iphone-14-pro/spaceblack/01.webp',
  },
  {
    id: 2,
    image: 'img/tablets/apple-ipad-pro-11-2021/spacegray/01.webp',
  },
  {
    id: 3,
    image: 'img/accessories/apple-watch-series-6/space-gray/00.webp',
  },
];

export const HeroSlider = () => {
  const { t } = useTranslation();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperInstance) {
        if (activeIndex === slides.length - 1) {
          swiperInstance.slideTo(0);
        } else {
          swiperInstance.slideNext();
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, swiperInstance]);

  const handlePrev = () => {
    if (!swiperInstance) {
      return;
    }

    if (activeIndex === 0) {
      swiperInstance.slideTo(slides.length - 1);

      return;
    }

    swiperInstance.slidePrev();
  };

  const handleNext = () => {
    if (!swiperInstance) {
      return;
    }

    if (activeIndex === slides.length - 1) {
      swiperInstance.slideTo(0);

      return;
    }

    swiperInstance.slideNext();
  };

  return (
    <div className={styles.sliderContainer}>
      <h1 className={styles.title}>{t('hero.title')}</h1>

      <div className={styles.sliderWrapper}>
        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePrev}
          >
            <img
              src="img/arrow_left.svg"
              alt={t('hero.prevAlt')}
              data-no-dark-filter="true"
            />
          </button>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          onSwiper={setSwiperInstance}
          onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
          className={styles.swiper}
        >
          {slides.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className={styles.slideContent}>
                <div className={styles.slideLeft}>
                  <div className={styles.textContent}>
                    <h2 className={styles.slideTitle}>
                      {t('hero.slideTitle')}
                      <span className={styles.emoji}></span>
                    </h2>
                    <p className={styles.slideSubtitle}>
                      {t('hero.slideSubtitle')}
                    </p>
                    <a href="#" className={styles.orderButton}>
                      {t('hero.orderNow')}
                    </a>
                  </div>
                </div>
                <div className={styles.slideRight}>
                  <img
                    src={slide.image}
                    alt={t('hero.productAlt')}
                    className={styles.slideImage}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleNext}
          >
            <img
              src="img/arrow_right.svg"
              alt={t('hero.nextAlt')}
              data-no-dark-filter="true"
            />
          </button>
        </div>
      </div>

      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={classNames(styles.paginationDot, {
              [styles.isActive]: index === activeIndex,
            })}
            onClick={() => swiperInstance?.slideTo(index)}
          />
        ))}
      </div>
    </div>
  );
};
