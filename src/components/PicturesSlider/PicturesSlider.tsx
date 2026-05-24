import { useState, useEffect, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';

const bannerImages = [
  {
    id: 1,
    src: 'img/banner-iphone-14.png',
    alt: 'Phone 14 Pro',
  },
  {
    id: 2,
    src: 'img/banner-phones.png',
    alt: 'Phones banner',
  },
  {
    id: 3,
    src: 'img/banner-tablets.png',
    alt: 'Tablets banner',
  },
  {
    id: 4,
    src: 'img/banner-accessories.png',
    alt: 'Accessories banner',
  },
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev === bannerImages.length - 1 ? 0 : prev + 1));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? bannerImages.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);

    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <div className={styles.slider}>
      <div className={styles.slider__container}>
        <button
          type="button"
          className={styles.slider__button}
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <img src="img/icons/arrow-left.svg" alt="Previous" />
        </button>

        <div className={styles.slider__viewport}>
          <div
            className={styles.slider__track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {bannerImages.map(image => (
              <div key={image.id} className={styles.slider__slide}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.slider__image}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.slider__button}
          onClick={goToNext}
          aria-label="Next slide"
        >
          <img src="img/icons/arrow-right.svg" alt="Next" />
        </button>
      </div>

      <div className={styles.slider__dots}>
        {bannerImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`${styles.slider__dot} ${
              index === currentIndex ? styles['slider__dot--active'] : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
