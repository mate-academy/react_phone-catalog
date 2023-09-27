import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ArrowLeft } from '../../img/ArrowLeft';
import { ArrowRight } from '../../img/ArrowRight';

import './imageslider.scss';

const baseImages = [
  '_new/img/banner-phones.png',
  '_new/img/banner-tablets.png',
  '_new/img/banner-accessories.png',
];

export const ImageSlider = () => {
  const [itemIndex, setItemIndex] = useState(0);
  const imagePosition = itemIndex * 100 * -1;

  const handleLeftButton = () => {
    if (itemIndex === 0) {
      setItemIndex(baseImages.length - 1);
    } else {
      setItemIndex(ind => ind - 1);
    }
  };

  const handleRightButton = () => {
    if (itemIndex === baseImages.length - 1) {
      setItemIndex(0);
    } else {
      setItemIndex(ind => ind + 1);
    }
  };

  useEffect(() => {
    const autoSlide = setTimeout(() => {
      handleRightButton();
    }, 5000);

    return () => clearTimeout(autoSlide);
  });

  return (
    <div
      className="image-slider"
    >
      <div
        className="image-slider__content"
      >
        <button
          type="button"
          className="image-slider__slide-button"
          aria-label="backSlide"
          id="backSlide"
          onClick={handleLeftButton}
        >
          <ArrowLeft />
        </button>

        <div
          className="image-slider__images-wrapper"
        >
          <div
            className="image-slider__images"
            style={{
              transform: `translateX(${imagePosition}%)`,
              transition: 'all 2000ms',
            }}
          >
            {baseImages.map(imageUrl => (
              <img
                key={imageUrl}
                src={imageUrl}
                alt={imageUrl}
                className="image-slider__image"
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="image-slider__slide-button"
          aria-label="forwardSlide"
          id="forwardSlide"
          onClick={handleRightButton}
        >
          <ArrowRight />
        </button>
      </div>

      <div className="image-slider__small-buttons">
        {baseImages.map((imageUrl, index) => (
          <button
            type="button"
            key={imageUrl}
            className="image-slider__small-button-wrap"
            onClick={() => setItemIndex(index)}
          >
            <div
              className={classNames('image-slider__small-button',
                { 'image-slider__small-button--active': index === itemIndex })}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
