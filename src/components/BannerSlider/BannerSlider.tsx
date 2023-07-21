import { useEffect, useState } from 'react';
import classNames from 'classnames';
import bannerPhones from './img/banner-phones.png';
import bannerTablets from './img/banner-tablets.png';
import bannerAccessories from './img/banner-accessories.png';

import './BannerSlider.scss';

const images = [
  bannerPhones,
  bannerTablets,
  bannerAccessories,
];

export const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < 0) {
      setCurrentIndex(images.length - 1);
    }

    if (currentIndex > images.length - 1) {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentIndex(prev => prev + 1),
      5000,
    );

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const handleGoPrevious = () => setCurrentIndex(prev => prev - 1);
  const handleGoNext = () => setCurrentIndex(prev => prev + 1);

  return (
    <section className="page__section banner-slider">
      <div className="banner-slider__container">
        <div className="banner-slider__img-container">
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt="banner"
              className={classNames('banner-slider__img', {
                'banner-slider__img--active': currentIndex === index,
              })}
            />
          ))}
        </div>
        <button
          type="button"
          className="banner-slider__button banner-slider__prev-button"
          onClick={handleGoPrevious}
        >
          <img src="icons/leftArrow.svg" alt="previous banner" />
        </button>
        <button
          type="button"
          className="banner-slider__button banner-slider__next-button"
          onClick={handleGoNext}
        >
          <img src="icons/rightArrow.svg" alt="next banner" />
        </button>
      </div>
      <div className="banner-slider__dots-container">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label="dot button"
            className={classNames('banner-slider__dot-button', {
              'banner-slider__dot-button--active': currentIndex === index,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
