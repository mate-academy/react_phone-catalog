import React, { useRef } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './PicturesSlider.module.scss';

const SLIDER_DATA = [
  {
    imageSrc: 'img/banner-iphome-14-pro.png',
    descriptionText: 'Now available in our store! ',
    descriptionEmoji: '👌',
    title: 'iPhone 14 Pro',
    subtitle: 'Pro. Beyond.',
    cta: 'ORDER NOW',
  },
  {
    imageSrc: 'img/category-tablets.webp',
    descriptionText: 'Check our latest tablets! ',
    descriptionEmoji: '✨',
    title: 'iPad Air',
    subtitle: 'Light. Bright. Full of might.',
    cta: 'SHOP NOW',
  },
  {
    imageSrc: 'img/category-accessories.webp',
    descriptionText: 'Complete Your Setup. ',
    descriptionEmoji: '🎧',
    title: 'Accessories',
    subtitle: 'Find what you need.',
    cta: 'DISCOVER',
  },
];

export const PicturesSlider: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const handleSwiperInit = (swiper: SwiperCore) => {
    if (
      swiper.params.navigation &&
      typeof swiper.params.navigation === 'object'
    ) {
      const navigation = swiper.params.navigation;

      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__mainLayout}>
        <button
          ref={prevRef}
          className={classNames(styles.slider__button, styles.slider__prevBtn)}
          aria-label="Previous slide"
        >
          <img src="img/icons/icon-left.png" alt="Previous" />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          slidesPerView={1}
          speed={1000}
          onInit={handleSwiperInit}
          pagination={{ clickable: true, el: `.${styles.slider__pagination}` }}
          className={styles.swiperContainer}
        >
          {SLIDER_DATA.map((slide, index) => (
            <SwiperSlide key={index} className={styles.slider__slide}>
              <div className={styles.slider__layout}>
                <div className={styles.slider__contentBox}>
                  <p className={styles.slider__description}>
                    <span className={styles.slider__gradientText}>
                      {slide.descriptionText}
                    </span>
                    <span>{slide.descriptionEmoji}</span>
                  </p>

                  <p className={styles.slider__subtitle}>Be the first!</p>
                  <button className={styles.slider__ctaButton} disabled>
                    {slide.cta}
                  </button>
                </div>

                <div className={styles.slider__imageArea}>
                  <p className={styles.slider__mobileDescription}>
                    <span className={styles.slider__gradientText}>
                      {slide.descriptionText}
                    </span>
                    <span>{slide.descriptionEmoji}</span>
                  </p>

                  <h2 className={styles.slider__title}>{slide.title}</h2>
                  <p className={styles.slider__imageSubtitle}>
                    {slide.subtitle}
                  </p>
                  <img
                    src={slide.imageSrc}
                    alt={slide.title}
                    className={styles.slider__image}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={nextRef}
          className={classNames(styles.slider__button, styles.slider__nextBtn)}
          aria-label="Next slide"
        >
          <img src="img/icons/icon-right.png" alt="Next" />
        </button>
      </div>

      <div className={styles.slider__pagination}></div>
    </div>
  );
};
