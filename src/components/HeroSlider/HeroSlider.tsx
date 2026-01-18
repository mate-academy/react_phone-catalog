import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import classNames from 'classnames';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './HeroSlider.module.scss';

const slides = [
  {
    id: 1,
    image: '/img/phones/apple-iphone-14-pro/spaceblack/01.webp',
  },
  {
    id: 2,
    image: '/img/tablets/apple-ipad-pro-11-2021/spacegray/01.webp',
  },
  {
    id: 3,
    image: '/img/accessories/apple-watch-series-6/space-gray/00.webp',
  },
];

export const HeroSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return (
    <div className={styles.sliderContainer}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <div className={styles.sliderWrapper}>
        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <img src="/img/arrow_left.svg" alt="Arrow left" />
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
                  <h2 className={styles.slideTitle}>
                    Now available in our store!
                    <span className={styles.emoji}></span>
                  </h2>
                  <p className={styles.slideSubtitle}>Be the first!</p>
                  <a href="#" className={styles.orderButton}>
                    ORDER NOW
                  </a>
                </div>
                <div className={styles.slideRight}>
                  <img
                    src={slide.image}
                    alt="Product"
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
            aria-label="Next slide"
          >
            <img src="/img/arrow_right.svg" alt="Arrow right" />
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
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
