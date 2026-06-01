import { FC, useRef, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import { Container } from '../../../../components/Container';

interface Banner {
  id: string;
  image: string;
  title: string;
}

interface PicturesSliderProps {
  banners: Banner[];
}

export const PicturesSlider: FC<PicturesSliderProps> = ({ banners }) => {
  const [current, setCurrent] = useState(0);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handlePrev = () => {
    setCurrent(prev => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent(prev => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleSwipe = () => {
    const difference = touchStartX.current - touchEndX.current;
    const isLeftSwipe = difference > 50; // Свайп влево на 50px
    const isRightSwipe = difference < -50; // Свайп вправо на 50px

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  if (banners.length === 0) {
    return null;
  }

  const banner = banners[current];

  return (
    <div className={styles.slider}>
      <Container>
        <h1 className={styles.srOnly}>Product Catalog</h1>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      </Container>
      <div
        className={styles.bannerContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className={styles.arrowLeft}
          onClick={handlePrev}
          aria-label="Previous"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
              fill="#313237"
            />
          </svg>
        </button>

        <img src={banner.image} alt={banner.title} className={styles.image} />

        <button
          className={styles.arrowRight}
          onClick={handleNext}
          aria-label="Next"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
              fill="#313237"
            />
          </svg>
        </button>
      </div>

      <div className={styles.indicators}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.active : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
