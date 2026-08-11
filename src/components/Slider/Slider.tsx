import { useState, useCallback, useEffect } from 'react';
import Banner1 from '../../../public/img/slider/Banner1.png';
import Banner2 from '../../../public/img/slider/Banner2.png';
import Banner3 from '../../../public/img/slider/Banner3.png';
import BannerPhone1 from '../../../public/img/slider/BannerPhone1.jpeg';
import BannerPhone2 from '../../../public/img/slider/BannerPhone2.jpeg';
import BannerPhone3 from '../../../public/img/slider/BannerPhone3.png';
import styles from './Slider.module.scss';

const SLIDES = [
  {
    images: {
      mobile: BannerPhone1,
      tablet: Banner1,
      desktop: Banner1,
    },
    alt: 'iPhone 15 Pro',
  },
  {
    images: {
      mobile: BannerPhone2,
      tablet: Banner2,
      desktop: Banner2,
    },
    alt: 'iPhone 14 Pro',
  },
  {
    images: {
      mobile: BannerPhone3,
      tablet: Banner3,
      desktop: Banner3,
    },
    alt: 'iPhone 14 Pro Max',
  },
];

export const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className={styles.slider}>
      <div className={styles.slider__container}>
        <button
          className={`${styles.slider__button} ${styles['slider__button--prev']}`}
          onClick={prevSlide}
        >
          ←
        </button>

        <div className={styles.slider__viewport}>
          <div
            className={styles.slider__track}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {SLIDES.map((slide, index) => (
              <div key={slide.alt} className={styles.slider__slide}>
                <picture className={styles.slider__picture}>
                  <source
                    media="(min-width: 1200px)"
                    srcSet={slide.images.desktop}
                  />
                  <source
                    media="(min-width: 640px)"
                    srcSet={slide.images.tablet}
                  />
                  <img
                    className={styles.slider__image}
                    src={slide.images.mobile}
                    alt={slide.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.slider__button} ${styles['slider__button--next']}`}
          onClick={nextSlide}
        >
          →
        </button>
      </div>

      <div className={styles.slider__dots}>
        {SLIDES.map((_, index) => (
          <button
            key={index}
            className={`${styles.slider__dot} ${
              index === activeSlide ? styles['slider__dot--active'] : ''
            }`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
