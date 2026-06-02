/* eslint-disable prettier/prettier */

import { useState, useEffect } from 'react';

import arrowLeft from '@/assets/svg/arrow-left.svg';
import arrowRight from '@/assets/svg/arrow-right.svg';
import bannerDesktop from '@/assets/img/banner-desktop&tablet.png';
import bannerMobile from '@/assets/img/banner-mobile.png';

import styles from './BannerSlider.module.scss';

const { slider, arrow, viewport, track, slide, pagination, dot, dotActive } =
  styles;

export const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      desktop: bannerDesktop,
      mobile: bannerMobile,
      alt: 'Promo banner 1',
    },
    {
      id: 2,
      desktop: bannerDesktop,
      mobile: bannerMobile,
      alt: 'Promo banner 2',
    },
    {
      id: 3,
      desktop: bannerDesktop,
      mobile: bannerMobile,
      alt: 'Promo banner 3',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className={slider}>
      <button
        type="button"
        className={arrow}
        aria-label="Previous slide"
        onClick={handlePrev}
      >
        <img src={arrowLeft} alt="Arrow left" />
      </button>

      <div className={viewport}>
        <div
          className={track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map(item => (
            <picture key={item.id} className={slide}>
              <source srcSet={item.mobile} media="(max-width: 639px)" />
              <img src={item.desktop} alt={item.alt} />
            </picture>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={arrow}
        aria-label="Next slide"
        onClick={handleNext}
      >
        <img src={arrowRight} alt="Arrow right" />
      </button>

      <div className={pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${dot} ${index === currentIndex ? dotActive : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
