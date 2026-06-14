/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useState, useEffect } from 'react';

import { Button } from '@/modules/shared/components/ui/Button';

import arrowLeft from '@/assets/svg/arrow-left.svg';
import arrowRight from '@/assets/svg/arrow-right.svg';

import bannerPhones from '@/assets/webp/banner_phones.webp';
import bannerTablets from '@/assets/webp/banner_tablets.webp';
import bannerAccessories from '@/assets/webp/banner_accessories.webp';

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
  { id: 1, image: bannerPhones, alt: 'Promo banner Phones' },
  { id: 2, image: bannerTablets, alt: 'Promo banner Tablets' },
  { id: 3, image: bannerAccessories, alt: 'Promo banner Accessories' },
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
    const interval = setInterval(handleNext, 5000);

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
            <div key={item.id} className={sliderSlide}>
              <img src={item.image} alt={item.alt} />
            </div>
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
