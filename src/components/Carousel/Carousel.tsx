import './Carousel.scss';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

const images = [
  'banner-phones.png',
  'banner-tablets.png',
  'banner-accessories.png',
];

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentIndex((prev) => prev + 1),
      5000,
    );

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel__box">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          className="
            carousel__button
            button-square
            button-square--high
          "
        >
          <img src="img/icons/arrow_left.svg" alt="arrow left" />
        </button>

        <div className="carousel__slide">
          {images.map((image, index) => {
            if (currentIndex < 0) {
              setCurrentIndex(images.length - 1);
            }

            if (currentIndex > images.length - 1) {
              setCurrentIndex(0);
            }

            return (
              <img
                src={`img/${image}`}
                className={classNames(
                  'carousel__image',
                  { 'carousel__image--active': index === currentIndex },
                )}
                alt={image}
                key={image}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className="
            carousel__button
            button-square
            button-square--high
          "
        >
          <img src="img/icons/arrow_right.svg" alt="arrow right" />
        </button>
      </div>

      <div className="carousel__pagination">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label="pagination-item"
            className={classNames(
              'carousel__item-button',
              'item-button',
              { 'item-button--active': index === currentIndex },
            )}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          />
        ))}
      </div>
    </div>
  );
};
