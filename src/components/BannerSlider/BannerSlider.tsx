import React, { useEffect, useState } from 'react';
import styles from './BannerSlider.module.scss';

export const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners = [
    {
      id: 1,
      imgUrl: '_old/v2/img/banner-accessories.png',
      alt: 'Accessories banner',
    },
    { id: 2, imgUrl: '_old/v2/img/banner-phones.png', alt: 'Phones banner' },
    { id: 3, imgUrl: '_old/v2/img/banner-tablets.png', alt: 'Tablets banner' },
  ];

  // для переходів слайдів
  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1,
    );
  };

  // обробник натискання клавіш для слайдера (стрілки вліво та вправо)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [banners.length]);

  return (
    <section className={styles.sliderWrapper}>
      <h2>Welcome to Nice Gadgets store!</h2>
      <div
        className={styles.bannerSlider}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.slides}>
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={styles.slide}
              style={{ display: index === currentIndex ? 'block' : 'none' }}
            >
              <img src={banner.imgUrl} alt={banner.alt} />
            </div>
          ))}
        </div>
        <button className={styles.prevButton} onClick={handlePrev}>
          &#10094;
        </button>
        <button className={styles.nextButton} onClick={handleNext}>
          &#10095;
        </button>
      </div>

      {/* індикатори-рисочки під слайдером */}
      <div className={styles.dots}>
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
