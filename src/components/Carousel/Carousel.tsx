import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import arrowLeft from '../../assets/svg/arrowLeft.svg';
import arrowRigth from '../../assets/svg/arrowRigth.svg';

import './carousel.scss';

type Props = {
  images: string[];
};

export const Carousel: FC<Props> = ({ images }) => {
  const [currentIndex, setCurrenIndex] = useState(0);

  useEffect(() => {
    if (currentIndex > images.length - 1) {
      setCurrenIndex(0);
    }

    if (currentIndex < 0) {
      setCurrenIndex(images.length - 1);
    }
  }, [currentIndex, images]);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrenIndex((prev) => prev + 1),
      5000,
    );

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel__box">
        <div className="carousel__row">
          {images.map((image, index) => {
            return (
              <img
                src={image}
                alt={image}
                key={image}
                className={classNames('carousel__img', {
                  'carousel__img--active': index === currentIndex,
                })}
              />
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setCurrenIndex((prev) => prev - 1)}
          className="carousel__button carousel__button--prev"
        >
          <img src={arrowLeft} alt="arrowLeft" />
        </button>
        <button
          type="button"
          onClick={() => setCurrenIndex((prev) => prev + 1)}
          className="carousel__button carousel__button--next"
        >
          <img src={arrowRigth} alt="arrowRigth" />
        </button>
      </div>
      <div className="carousel__pagination-box">
        {images.map((image, index) => (
          <button
            key={image}
            aria-label="pagination-item"
            type="button"
            className={classNames('carousel__item-btn', {
              'carousel__item-btn--active': index === currentIndex,
            })}
            onClick={() => setCurrenIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
