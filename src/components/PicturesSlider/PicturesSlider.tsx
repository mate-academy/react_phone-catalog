import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useLanguage } from '../../context/LanguageContext';
import { getPublicPath } from '../../utils/getPublicPath';
import styles from './PicturesSlider.module.scss';

const images = [
  getPublicPath('img/banner-phones.png'),
  getPublicPath('img/banner-tablets.png'),
  getPublicPath('img/banner-accessories.png'),
];

export const PicturesSlider = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeStartX = useRef<number | null>(null);

  const goToNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    swipeStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) {
      return;
    }

    const swipeDistance = event.clientX - swipeStartX.current;

    if (Math.abs(swipeDistance) >= 40) {
      if (swipeDistance < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    swipeStartX.current = null;
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.slider}>
      <div className={styles.topContent}>
        <button
          type="button"
          className={styles.button}
          onClick={goToPrev}
          aria-label={t('pictures.previous')}
        >
          <img
            src={getPublicPath('img/chevron-left.svg')}
            alt=""
            aria-hidden="true"
            className={styles.icon}
          />
        </button>

        <div
          className={styles.imageContainer}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            swipeStartX.current = null;
          }}
        >
          <img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={t('pictures.banner')}
            draggable={false}
            className={styles.image}
          />
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={goToNext}
          aria-label={t('pictures.next')}
        >
          <img
            src={getPublicPath('img/chevron-right.svg')}
            alt=""
            aria-hidden="true"
            className={styles.icon}
          />
        </button>
      </div>

      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <button
            type="button"
            key={index}
            className={cn(styles.dot, {
              [styles.isActive]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
            aria-label={t('pictures.goTo', { number: index + 1 })}
          />
        ))}
      </div>
    </div>
  );
};
