import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

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
            if (currentIndex > images.length - 1) {
              setCurrenIndex(0);
            }

            if (currentIndex < 0) {
              setCurrenIndex(images.length - 1);
            }

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
          aria-label="prev"
          onClick={() => setCurrenIndex((prev) => prev - 1)}
          type="button"
          className="carousel__button carousel__button--prev"
        />
        <button
          aria-label="next"
          onClick={() => setCurrenIndex((prev) => prev + 1)}
          type="button"
          className="carousel__button carousel__button--next"
        />
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
