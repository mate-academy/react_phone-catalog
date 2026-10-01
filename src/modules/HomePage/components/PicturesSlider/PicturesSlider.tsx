import { useEffect, useState, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';
import { Icon } from '../../../../components/Icon/Icon';

type Slide = {
  image: string;
  alt: string;
};

const slides: Slide[] = [
  { image: 'public/img/banner-phones.png', alt: 'Phones banner' },
  { image: 'img/banner-tablets.png', alt: 'Tablets banner' },
  { image: 'img/banner-accessories.png', alt: 'Accessories banner' },
];

const getImageUrl = (path: string) => {
  const baseUrl = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('public/')
    ? path.replace('public/', '')
    : path;

  return baseUrl.endsWith('/')
    ? `${baseUrl}${cleanPath}`
    : `${baseUrl}/${cleanPath}`;
};

const AUTO_PLAY_INTERVAL = 5000;

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % slides.length);
  }, []);

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [currentIndex, goToNext]);

  return (
    <div className={styles.slider}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        <Icon name="chevronLeft" />
      </button>

      <div className={styles.slidesWrapper}>
        <div
          className={styles.slidesTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map(slide => (
            <img
              key={slide.image}
              src={getImageUrl(slide.image)}
              alt={slide.alt}
              className={styles.slideImage}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={goToNext}
        aria-label="Next slide"
      >
        <Icon name="chevronRight" />
      </button>

      <div className={styles.dashes}>
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className={`${styles.dash} ${index === currentIndex ? styles.dashActive : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
