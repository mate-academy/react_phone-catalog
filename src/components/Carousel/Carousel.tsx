import { useTranslation } from 'react-i18next';
import styles from './Carousel.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext';

const images = [
  './img/imgcarousel/phone1.jpg',
  './img/imgcarousel/phone2.jpg',
  './img/imgcarousel/phone3.jpg',
];

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { t, i18n } = useTranslation();
  const { cart, deletCard } = useContext(ProductsContext);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (currentIndex === extendedImages.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(images.length);
      }, 500);
    }
  }, [currentIndex, extendedImages.length]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) {
      handleNext();
    }

    if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  const realIndex =
    currentIndex === 0
      ? images.length - 1
      : currentIndex === extendedImages.length - 1
        ? 0
        : currentIndex - 1;

  const handleCheckout = () => {
    const confirmed = window.confirm(t('check'));

    if (confirmed) {
      cart.forEach(item => deletCard(item.id));
    }
  };

  return (
    <div className={styles.Carousel}>
      <div className={styles.decorBlock}>
        <div className={styles.content}>
          <p
            className={`${styles.titlecard} ${
              i18n.language.startsWith('de')
                ? styles.germanText
                : i18n.language.startsWith('ua')
                  ? styles.ukrainianText
                  : ''
            }`}
          >
            {t('textincarusel')}
          </p>
          <p
            className={`${styles.textp} ${
              i18n.language === 'ua' ? styles.smallText : ''
            }`}
          >
            {t('secoundtext')}
          </p>
          <button className={styles.buttonorder} onClick={handleCheckout}>
            {t('buttuncarusel')}
          </button>
        </div>
      </div>
      <div
        className={styles.carouselContent}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button className={styles.button} onClick={handlePrev}>
          <img src="./img/icons/arrowLeft.svg" alt="Arrow" />
        </button>
        <div
          className={styles.viewport}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={styles.track}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isTransitioning ? 'transform 500ms ease' : 'none',
            }}
          >
            {extendedImages.map((img, index) => (
              <div className={styles.slide} key={index}>
                <img src={`./${img}`} alt="" className={styles.carimg} />
              </div>
            ))}
          </div>
        </div>
        <button className={styles.button} onClick={handleNext}>
          <img src="./img/icons/arrowRight.svg" alt="Arrow" />
        </button>
      </div>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              realIndex === index ? styles.active : ''
            }`}
            onClick={() => setCurrentIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
