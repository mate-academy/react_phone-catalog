import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './PicturesSlider.module.scss';

const bannerImages = [
  {
    desktop: 'img/banner/banner-one.svg',
    mobile: 'img/banner/banner-one-mobile.svg',
  },
  {
    desktop: 'img/banner/banner.svg',
    mobile: 'img/banner/banner-mobile.svg',
  },
  {
    mobile: 'img/banner/banner-tablets.png',
    desktop: 'img/banner/banner-tablets.png',
  },
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1,
    );
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1,
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <div className={styles['pictures-slider']}>
      <div className={styles['pictures-slider__container']}>
        {/* Кнопка вліво */}
        <button
          type="button"
          onClick={handlePrev}
          className={`${styles['pictures-slider__arrow']} ${styles['pictures-slider__arrow--left']}`}
        >
          <img
            src="/react_phone-catalog/img/icons/arrow-left.svg"
            alt="Previous slide"
            className={styles['pictures-slider__arrow-icon']}
          />
        </button>

        {/* Якщо перший слайд — рендеримо як Link на телефони, інакше — як звичайний div */}
        {currentIndex === 0 ? (
          <Link
            to="/phones"
            className={`${styles['pictures-slider__window']} ${styles['pictures-slider__window--clickable']}`}
          >
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={bannerImages[currentIndex].mobile}
              />
              <img
                src={bannerImages[currentIndex].desktop}
                alt="Promo banner"
                className={styles['pictures-slider__image']}
              />
            </picture>
          </Link>
        ) : (
          <div className={styles['pictures-slider__window']}>
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={bannerImages[currentIndex].mobile}
              />
              <img
                src={bannerImages[currentIndex].desktop}
                alt="Promo banner"
                className={styles['pictures-slider__image']}
              />
            </picture>
          </div>
        )}

        {/* Кнопка вправо */}
        <button
          type="button"
          onClick={handleNext}
          className={`${styles['pictures-slider__arrow']} ${styles['pictures-slider__arrow--right']}`}
        >
          <img
            src="/react_phone-catalog/img/icons/arrow-right.svg"
            alt="Next slide"
            className={styles['pictures-slider__arrow-icon']}
          />
        </button>
      </div>

      {/* Пунктирні крапки */}
      <div className={styles['pictures-slider__dots']}>
        {bannerImages.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles['pictures-slider__dot']} ${
              index === currentIndex
                ? styles['pictures-slider__dot--active']
                : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
