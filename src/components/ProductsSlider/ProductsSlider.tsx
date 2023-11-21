/* eslint-disable no-console */
/* eslint-disable max-len */
import { useState } from 'react';
import sliderButton from '../../icons/Slider button.png';
import sliderButtonDisabled from
  '../../icons/Slider button - Disabled (right).png';

import './ProductsSlider.scss';

import { ProductCard } from '../ProductCard';
import { Phone } from '../../types/phone';

type Props = {
  hotPricesPhones?: Phone[];
  brandNewPhones?: Phone[];
};

export const ProductsSlider: React.FC<Props> = ({ hotPricesPhones, brandNewPhones }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = hotPricesPhones !== undefined ? hotPricesPhones : brandNewPhones;

  const updateIndex = (newIndex: number) => {
    let index = newIndex;

    if (newIndex < 0) {
      index = 0;
    } else if (items && newIndex >= (items.length - 4)) {
      index = items.length - 4;
    }

    setActiveIndex(index);
  };

  return (
    <div className="products-slider">
      <div className="products-slider__top">
        {hotPricesPhones ? (
          <h1 className="products-slider__title">Hot Prices</h1>
        ) : (
          <h1 className="products-slider__title">Brand new models</h1>
        )}

        <div className="products-slider__buttons">
          <button
            type="button"
            className="products-slider__button products-slider__button--left"
            onClick={() => {
              updateIndex(activeIndex - 1);
            }}
          >
            {activeIndex === 0 ? (
              <img
                src={sliderButtonDisabled}
                alt="slider disabled button left"
              />
            ) : (<img src={sliderButton} alt="slider button left" />)}

          </button>
          <button
            type="button"
            className="products-slider__button products-slider__button--right"
            onClick={() => {
              updateIndex(activeIndex + 1);
            }}
          >
            {items && activeIndex === items.length - 4 ? (
              <img
                src={sliderButtonDisabled}
                alt="slider disabled button right"
              />
            ) : (<img src={sliderButton} alt="slider button right" />)}

          </button>
        </div>
      </div>

      <div
        className="products-slider__cards-container"
        data-cy="cardsContainer"
        style={{ transform: `translate(-${activeIndex * 288}px)` }}
      >
        {items && items.map(phone => {
          return (
            <ProductCard
              phone={phone}
              key={phone.id}
              hotPricesPhones={hotPricesPhones}
            />
          );
        })}
      </div>
    </div>
  );
};
