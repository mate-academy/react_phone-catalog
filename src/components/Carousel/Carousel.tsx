import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import arrowLeft from '../../assets/svg/arrowLeft.svg';
import arrowRigth from '../../assets/svg/arrowRight.svg';

import './carousel.scss';

type Props = {
  images: string[];
};

export const Carousel: FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleArrowLeft = () => setActiveIndex(prevState => prevState - 1);
  const handleArrowRight = () => setActiveIndex(prevState => prevState + 1);
  const handlePagination = (index: number) => setActiveIndex(index);

  useEffect(() => {
    if (activeIndex > images.length - 1) {
      setActiveIndex(0);
    }

    if (activeIndex < 0) {
      setActiveIndex(images.length - 1);
    }
  }, [activeIndex, images]);

  useEffect(() => {
    const interval = setInterval(
      () => setActiveIndex(prevState => prevState + 1),
      5000,
    );

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="carousel">
      <div className="carousel__box">
        <div className="carousel__row">
          {images.map((image, index) => (
            <img
              src={image}
              alt={image}
              key={image}
              className={classNames(
                'carousel__img',
                { 'carousel__img--active': activeIndex === index },
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleArrowLeft}
          className="carousel__button carousel__button--prev"
        >
          <img src={arrowLeft} alt="arrowLeft" />
        </button>
        <button
          type="button"
          onClick={handleArrowRight}
          className="carousel__button carousel__button--next"
        >
          <img src={arrowRigth} alt="arrowRigth" />
        </button>
      </div>
      <div className="carousel__pagination-box">
        {images.map((image, index) => (
          <button
            type="button"
            aria-label="pagination-item"
            key={image}
            className={classNames(
              'carousel__item-btn',
              { 'carousel__item-btn--active': activeIndex === index },
            )}
            onClick={() => handlePagination(index)}
          />
        ))}
      </div>
    </div>
  );
};
