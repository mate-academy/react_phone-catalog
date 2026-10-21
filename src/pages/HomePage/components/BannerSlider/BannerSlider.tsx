import React, { TouchEvent, useEffect, useState } from 'react';
import { Icon } from '../../../../components/Icon';
import { getAssetUrl } from '../../../../utils/assets';
import styles from './BannerSlider.module.scss';

const bannerImages = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

type SlideDirection = 'previous' | 'next';

interface BannerButtonProps {
  direction: SlideDirection;
  onClick: () => void;
}

const ArrowButton: React.FC<BannerButtonProps> = ({ direction, onClick }) => (
  <button
    type="button"
    className={styles.navButton}
    aria-label={direction === 'previous' ? 'Previous slide' : 'Next slide'}
    onClick={onClick}
  >
    <Icon name={direction === 'previous' ? 'chevron-left' : 'chevron-right'} />
  </button>
);

export const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const showSlide = (direction: SlideDirection) => {
    setCurrentSlide(prev => {
      if (direction === 'previous') {
        return (prev - 1 + bannerImages.length) % bannerImages.length;
      }

      return (prev + 1) % bannerImages.length;
    });
  };

  const handleTouchStart = (event: TouchEvent) => {
    setTouchStart(event.targetTouches[0].clientX);
  };

  const handleTouchMove = (event: TouchEvent) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;

    if (distance > 50) {
      showSlide('next');
    }

    if (distance < -50) {
      showSlide('previous');
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ArrowButton
          direction="previous"
          onClick={() => showSlide('previous')}
        />

        <div
          className={styles.window}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {bannerImages.map((imgSrc, index) => (
              <div key={imgSrc} className={styles.slide}>
                <img src={getAssetUrl(imgSrc)} alt={`Banner ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <ArrowButton direction="next" onClick={() => showSlide('next')} />
      </div>

      <div className={styles.dots}>
        {bannerImages.map((imgSrc, index) => (
          <button
            key={imgSrc}
            type="button"
            className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
