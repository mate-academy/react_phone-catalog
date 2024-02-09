/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import cl from 'classnames';
import { bannerImages } from '../../helper';

import { ArrowLeft, ArrowRight } from '../../icons';
import './ImageSlider.scss';

export const ImageSlider = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImage = () => {
    setImageIndex(index => {
      if (index === bannerImages.length - 1) {
        return 0;
      }

      return index + 1;
    });
  };

  const showPrevImage = () => {
    setImageIndex(index => {
      if (index === 0) {
        return bannerImages.length - 1;
      }

      return index - 1;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((index) => (
        index === bannerImages.length - 1
          ? 0
          : index + 1
      ));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [imageIndex]);

  return (
    <section
      className="slider"
    >
      <button
        onClick={showPrevImage}
        className="slider__button slider__button--right"
        type="button"
      >
        <ArrowLeft />
      </button>
      <div
        className="slider__images"
      >
        {bannerImages.map((image, index) => (
          <img
            key={image.img}
            src={image.img}
            alt={image.alt}
            aria-hidden={imageIndex !== index}
            className="slider__image"
            style={{ transform: `translateX(${-100 * imageIndex}%)` }}
          />
        ))}
      </div>
      <button
        onClick={showNextImage}
        className="slider__button slider__button--left"
        type="button"
      >
        <ArrowRight />
      </button>

      <div
        className="slider__dots"
      >
        {bannerImages.map(({ img }, index) => (
          <button
            key={img}
            type="button"
            className={cl('slider__dot', {
              'slider__dot--active': imageIndex === index,
            })}
            onClick={() => setImageIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
