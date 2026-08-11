import React, { useState, useEffect, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';

const bannerImages = [
  {
    desktop: '/img/banner/banner-one.svg',
    mobile: '/img/banner/banner-one-mobile.svg',
  },
  {
    desktop: '/img/banner/banner.svg',
    mobile: '/img/banner/banner-mobile.svg',
  },
  {
    mobile: '/img/banner/banner-one-mobile.svg',
    desktop: '/img/banner/banner-one.svg',
  },
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ф-ця перемикання вперед (стабільне посилання за допомогою useCallback)
  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1,
    );
  }, []);

  // Ф-ця перемикання назад
  const handlePrev = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1,
    );
  }, []);

  // Таймер для зміни зображення
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, handleNext]); // Тепер працює коректно, скидаючи таймер при ручних кліках

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
            src="img/icons/arrow-left.svg"
            alt="Previous slide"
            className={styles['pictures-slider__arrow-icon']}
          />
        </button>

        {/* Блок з зображенням адаптований */}
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

        {/* Кнопка вправо */}
        <button
          type="button"
          onClick={handleNext}
          className={`${styles['pictures-slider__arrow']} ${styles['pictures-slider__arrow--right']}`}
        >
          <img
            src="img/icons/arrow-right.svg"
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
