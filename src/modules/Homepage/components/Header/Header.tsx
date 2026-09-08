import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
const images = [
  {
    id: 1,
    url: 'img/banner-phones.png',
  },
  {
    id: 2,
    url: 'img/banner-tablets.png',
  },
  {
    id: 3,
    url: 'img/banner-accessories.png',
  },
];

export const Header = () => {
  const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      setCurrentIndex(prev => Math.min(prev + 1, 2));
    } else if (distance < -50) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  function handleIndexInc() {
    if (currentIndex < 2) {
      setCurrentIndex(cur => cur + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  function handleIndexDec() {
    if (currentIndex > 0) {
      setCurrentIndex(cur => cur - 1);
    } else {
      setCurrentIndex(2);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.hidden_title}>Product Catalog</h1>

      <h1 className={styles.container__title}>{t('welcome')}</h1>
      <div
        className={`${styles.slider_arrow} ${styles.slider_arrow__left}`}
        onClick={handleIndexDec}
      ></div>
      <div
        className={styles.sliderWrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.sliderInner}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map(image => {
            return (
              <img
                key={image.id}
                src={image.url}
                alt={image.url}
                className={styles.image}
                style={{ backgroundColor: '#E3F2FD' }}
              />
            );
          })}
        </div>

        <div className={styles.lowerButtons}>
          {images.map((slide, index) => {
            return (
              <div
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                className={
                  currentIndex === index
                    ? styles.lowerButtons__button_active
                    : styles.lowerButtons__button
                }
              ></div>
            );
          })}
        </div>
      </div>
      <div
        className={`${styles.slider_arrow} ${styles.slider_arrow__right}`}
        onClick={handleIndexInc}
      ></div>
    </div>
  );
};
