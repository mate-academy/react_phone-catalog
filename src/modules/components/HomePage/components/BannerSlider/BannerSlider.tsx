/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useState, useEffect } from 'react';

import { Button } from '@/modules/shared/components/ui/Button';

import arrowLeft from '@/assets/svg/arrow-left.svg';
import arrowRight from '@/assets/svg/arrow-right.svg';
import bannerDesktop from '@/assets/img/banner-desktop&tablet.png';
import bannerMobile from '@/assets/img/banner-mobile.png';

import styles from './BannerSlider.module.scss';
//#endregion

//#region STYLES_&_CONSTANTS
const {
  sliderContainer,
  sliderArrow,
  sliderViewport,
  sliderTrack,
  sliderSlide,
  sliderPagination,
  sliderDot,
  sliderDotActive,
} = styles;

const slides = [
  { id: 1, desktop: bannerDesktop, mobile: bannerMobile, alt: 'Promo banner 1' },
  { id: 2, desktop: bannerDesktop, mobile: bannerMobile, alt: 'Promo banner 2' },
  { id: 3, desktop: bannerDesktop, mobile: bannerMobile, alt: 'Promo banner 3' },
];
//#endregion

export const BannerSlider = () => {
  //#region STATE
  const [currentIndex, setCurrentIndex] = useState(0);
  //#endregion

  //#region HANDLERS
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
  //#endregion

  //#region RENDER
  return (
    <div className={sliderContainer}>
      <Button
        variant="icon"
        className={sliderArrow}
        aria-label="Previous slide"
        onClick={handlePrev}
      >
        <img src={arrowLeft} alt="Arrow left" />
      </Button>

      <div className={sliderViewport}>
        <div
          className={sliderTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map(item => (
            <picture key={item.id} className={sliderSlide}>
              <source srcSet={item.mobile} media="(max-width: 639px)" />
              <img src={item.desktop} alt={item.alt} />
            </picture>
          ))}
        </div>
      </div>

      <Button
        variant="icon"
        className={sliderArrow}
        aria-label="Next slide"
        onClick={handleNext}
      >
        <img src={arrowRight} alt="Arrow right" />
      </Button>

      <div className={sliderPagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`
              ${sliderDot}
              ${index === currentIndex ? sliderDotActive : ''}
            `}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
  //#endregion
};
