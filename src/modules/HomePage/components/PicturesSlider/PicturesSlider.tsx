import { useCallback, useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import { Link } from 'react-router-dom';

const BANNERS = [
  {
    id: 1,
    imgMobile: './img/banners/banner1-mob-slider.png',
    imgWeb: './img/banners/banner1-web-slider.png',
    alt: 'Banner Mobile Phones',
    link: '/phones',
  },
  {
    id: 2,
    imgMobile: './img/banners/banner2-mob-slider.png',
    imgWeb: './img/banners/banner2-web-slider.png',
    alt: 'Banner Tablets',
    link: '/tablets',
  },
  {
    id: 3,
    imgMobile: './img/banners/banner3-mob-slider.png',
    imgWeb: './img/banners/banner3-web-slider.png',
    alt: 'Banner Accessories',
    link: '/accessories',
  },
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? BANNERS.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === BANNERS.length - 1 ? 0 : prevIndex + 1,
    );
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  return (
    <div
      className={styles.slider}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.content}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonPrev}`}
          onClick={handlePrev}
          aria-label="Previous slide"
          data-cy="prevSlideButton"
        >
          <img src="./img/icons/arrow-left.svg" alt="" aria-hidden="true" />
        </button>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BANNERS.map(banner => (
              <div key={banner.id} className={styles.slide}>
                <Link to={banner.link}>
                  <picture>
                    <source media="(min-width: 640px)" srcSet={banner.imgWeb} />

                    <img
                      src={banner.imgMobile}
                      alt={banner.alt}
                      className={styles.image}
                    />
                  </picture>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.button} ${styles.buttonNext}`}
          onClick={handleNext}
          aria-label="Next slide"
          data-cy="nextSlideButton"
        >
          <img src="./img/icons/arrow-right.svg" alt="" aria-hidden="true" />
        </button>
      </div>

      <div className={styles.dots}>
        {BANNERS.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            className={`${styles.dot} ${
              index === currentIndex ? styles.dotActive : ''
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
