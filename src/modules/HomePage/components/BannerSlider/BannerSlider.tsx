import { useEffect, useState } from 'react';
import styles from './BannerSlider.module.scss';
import { useTheme } from '../../../../store/theme/ThemeContext';
import { arrowLeftIconMap } from '../../../shared/config/arrowLeftIconMap';
import { arrowRightIconMap } from '../../../shared/config/arrowRightIconMap';

const slides = [
  {
    mobile: 'img/banner-phones.png',
    tablet: 'img/banner-phones.png',
    desktop: 'img/banner-phones.png',
  },
  {
    mobile: 'img/banner-tablets.png',
    tablet: 'img/banner-tablets.png',
    desktop: 'img/banner-tablets.png',
  },
  {
    mobile: 'img/category-accessories.png',
    tablet: 'img/category-accessories.png',
    desktop: 'img/category-accessories.png',
  },
];

export const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.bannerSlider}>
      <div className={styles.bannerInner}>
        <div className="layoutGrid">
          <button
            type="button"
            className={styles.arrowLeft}
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <img src={arrowLeftIconMap[theme].default} alt="" />
          </button>

          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <picture key={index} className={styles.slide}>
                  <source media="(min-width: 1200px)" srcSet={slide.desktop} />
                  <source media="(min-width: 640px)" srcSet={slide.tablet} />
                  <img
                    src={slide.mobile}
                    alt={`Banner ${index + 1}`}
                    className={styles.slideImage}
                  />
                </picture>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.arrowRight}
            onClick={handleNext}
            aria-label="Next slide"
          >
            <img src={arrowRightIconMap[theme].default} alt="" />
          </button>
        </div>

        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.dot} ${
                index === currentSlide ? styles.activeDot : ''
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
