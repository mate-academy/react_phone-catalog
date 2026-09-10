import React, { useState, useEffect, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';

// Імпортуємо картинки банерів напряму
import bannerPhones from '/img/banner-phones.png';
import bannerTablets from '/img/banner-tablets.png';
import bannerAccessories from '/img/banner-accessories.png';

// Імпортуємо іконки стрілок
import arrowLeft from '/img/icons/Arrow-left.svg';
import arrowRight from '/img/icons/Arrow-right.svg';

const BANNER_IMAGES = [
  { id: 1, src: bannerPhones, alt: 'iPhone promotion' },
  { id: 2, src: bannerTablets, alt: 'iPad promotion' },
  { id: 3, src: bannerAccessories, alt: 'Accessories promotion' },
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % BANNER_IMAGES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? BANNER_IMAGES.length - 1 : prevIndex - 1,
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className={styles.picturesSlider}>
      <div className={styles.picturesSlider__container}>
        <button
          type="button"
          className={styles.picturesSlider__btn}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <img src={arrowLeft} alt="Left" />
        </button>

        <div className={styles.picturesSlider__wrapper}>
          <div
            className={styles.picturesSlider__slides}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BANNER_IMAGES.map(banner => (
              <div key={banner.id} className={styles.picturesSlider__slide}>
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className={styles.picturesSlider__image}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.picturesSlider__btn}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <img src={arrowRight} alt="Right" />
        </button>
      </div>

      <div className={styles.picturesSlider__dots}>
        {BANNER_IMAGES.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            className={`${styles.picturesSlider__dot} ${
              index === currentIndex ? styles.picturesSlider__dotActive : ''
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
