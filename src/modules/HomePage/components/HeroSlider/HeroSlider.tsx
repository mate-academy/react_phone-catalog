import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './HeroSlider.module.scss';
import cn from 'classnames';

import banerPhones from '@/assets/img/banerPhones.webp';
import banerPhonesMedium from '@/assets/img/banerPhonesMedium.webp';
import banerPhonesSmall from '@/assets/img/banerPhonesSmall.webp';

import banerTablets from '@/assets/img/banerTablets.webp';
import banerTabletsMedium from '@/assets/img/banerTabletsMedium.webp';
import banerTabletsSmall from '@/assets/img/banerTabletSmall.webp';

import banerAccessories from '@/assets/img/banerAccessories.webp';
import banerAccessoriesMedium from '@/assets/img/banerAccessoriesMedium.webp';
import banerAccessoriesSmall from '@/assets/img/banerAccessoriesSmall.webp';

import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react';
import ArrowRight from '@/assets/icons/ArrowRight.svg?react';

const banners = [
  {
    id: 1,
    desktop: banerPhones,
    tablet: banerPhonesMedium,
    mobile: banerPhonesSmall,
    alt: 'New iPhone 14 Pro',
  },
  {
    id: 2,
    desktop: banerTablets,
    tablet: banerTabletsMedium,
    mobile: banerTabletsSmall,
    alt: 'New iPad',
  },
  {
    id: 3,
    desktop: banerAccessories,
    tablet: banerAccessoriesMedium,
    mobile: banerAccessoriesSmall,
    alt: 'New Accessories from Apple',
  },
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === banners.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Auto-play co 5 sekund
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  // SWIPE
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) {
      return;
    }

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart.current - touchEnd;

    if (distance > 50) {
      nextSlide();
    }

    if (distance < -50) {
      prevSlide();
    }

    touchStart.current = null;
  };

  return (
    <section className={styles.slider}>
      <div className={styles.slider__content}>
        <button
          className={cn(styles.slider__arrow, styles.slider__arrow_prev)}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ArrowLeft className={styles.icon} aria-label="Previous slide" />
        </button>

        <div
          className={styles.slider__window}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.slider__list}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map(banner => (
              <div key={banner.id} className={styles.slider__slide}>
                <picture>
                  <source media="(min-width: 1200px)" srcSet={banner.desktop} />
                  <source media="(min-width: 768px)" srcSet={banner.tablet} />
                  <img
                    src={banner.mobile}
                    alt={banner.alt}
                    className={styles.slider__image}
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>

        <button
          className={cn(styles.slider__arrow, styles.slider__arrow_next)}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ArrowRight className={styles.icon} aria-label="Next slide" />
        </button>
      </div>

      <div className={styles.slider__dots}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={cn(styles.slider__dot, {
              [styles.slider__dotActive]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
