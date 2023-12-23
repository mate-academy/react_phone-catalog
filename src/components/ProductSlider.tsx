import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { Phone } from '../types/Phone';
import { ProductCard } from './ProductCard';
import './ProductSlider.scss';

type Props = {
  title: string;
  products: Phone[];
};

export const ProductSlider: React.FC<Props> = ({
  title, products,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevClick = () => {
    setStartIndex((prevStartIndex) => Math.max(0, prevStartIndex - 1));
  };

  const handleNextClick = () => {
    setStartIndex((prevStartIndex) => Math.min(
      prevStartIndex + 1, products.length - 4,
    ));
  };

  const visibleCards = useMemo(() => {
    return products.slice(startIndex, startIndex + 4);
  }, [products, startIndex]);

  const isPrevButtonDisabled = startIndex === 0;
  const isNextButtonDisabled = startIndex === products.length - 4;

  return (
    <div className="container center">
      <div className="ProductsSlider">
        <div className="ProductsSlider__content">
          <h2 className="ProductsSlider__title">{title}</h2>

          <div className="ProductsSlider__buttons">
            <button
              type="button"
              onClick={handlePrevClick}
              disabled={isPrevButtonDisabled}
              className={classNames('ProductsSlider__button', {
                disabled: isPrevButtonDisabled,
              })}
              aria-label="label"
            >
              <div className="arrow--left" />
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              disabled={isNextButtonDisabled}
              className={classNames('ProductsSlider__button', {
                disabled: isNextButtonDisabled,
              })}
              aria-label="label"
            >
              <div className="arrow--right" />
            </button>
          </div>
        </div>

        <div
          className={classNames('ProductsSlider__cards',
            { 'ProductsSlider__card--animated': startIndex !== 0 })}
          data-cy="cardsContainer"
        >
          {visibleCards.map((card) => (
            <div className="ProductsSlider__card" key={card.id}>
              <ProductCard product={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
