import React, { useState } from 'react';
import { Product } from '../../../type/Product';
import { Card } from '../../../ProductCard/Card/Card';
import cn from 'classnames';
import './SliderDevices.scss';
import '../ButtonNextPrev.scss';
import '../../../text.scss';

type Props = {
  listProduct: Product[];
  title: string;
};

export const SliderDevices: React.FC<Props> = ({ listProduct, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 1;
  const totalSlides = listProduct.length - 2;

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1,
    );
  };

  const isPrevButtonDisabled = currentIndex === 0;
  const isNextButtonDisabled = currentIndex === totalSlides - 1;

  return (
    <div className="slider__devices">
      <div className="slider__header">
        <h2 className="text--h2">{title}</h2>
        <div className="slider__devices__button__container">
          <button
            className={cn('slider__button', 'slider__button--prev', {
              'slider__button--no-active': isPrevButtonDisabled,
            })}
            onClick={handlePrevClick}
            disabled={isPrevButtonDisabled}
          ></button>

          <button
            className={cn('slider__button', 'slider__button--next', {
              'slider__button--no-active': isNextButtonDisabled,
            })}
            onClick={handleNextClick}
            disabled={isNextButtonDisabled}
          ></button>
        </div>
      </div>

      <div className="slider__devices__content">
        <div
          className="slider__devices__wrapper"
          style={{
            transform: `translateX(-${currentIndex * 25}%)`,
            display: 'flex',
          }}
        >
          {listProduct.map((_, index) => {
            const start = index * itemsPerSlide;
            const end = start + itemsPerSlide;
            const itemsToShow = listProduct.slice(start, end);

            return (
              <div key={index} className="slider__devices__item">
                {itemsToShow.map(p => (
                  <Card key={p.itemId} product={p} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
