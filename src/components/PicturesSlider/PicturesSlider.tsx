import React, { useState, useEffect, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';

const bannerImages = [
  { id: 1, src: '/img/banner-phones.png', alt: 'Banner Phones' },
  { id: 2, src: '/img/banner-tablets.png', alt: 'Banner Tablets' },
  { id: 3, src: '/img/banner-accessories.png', alt: 'Banner Accessories' },
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1,
    );
  }, []);

  // Автоматичне перемикання кожні 5 секунд
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className={styles.container}>
      <div className={styles.sliderWrapper}>
        <button
          type="button"
          onClick={handlePrev}
          className={`${styles.btn} ${styles.btnPrev}`}
          aria-label="Previous slide"
        >
          &lt;
        </button>

        <div className={styles.window}>
          <div
            className={styles.slides}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {bannerImages.map(banner => (
              <div key={banner.id} className={styles.slide}>
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className={`${styles.btn} ${styles.btnNext}`}
          aria-label="Next slide"
        >
          &gt;
        </button>
      </div>

      {/* Риски-індикатори */}
      <div className={styles.dots}>
        {bannerImages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
