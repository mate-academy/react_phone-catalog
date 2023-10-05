import React, { useMemo, useState } from 'react';
import cn from 'classnames';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

import arrowLeft from '../../images/arrows/arrow-left.svg';
import arrowRight from '../../images/arrows/arrow-right.svg';

import './ProductsSlider.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = React.memo(
  ({ title, products }) => {
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
      <div className="container">
        <div className="ProductsSlider">
          <div className="ProductsSlider__content">
            <h2 className="ProductsSlider__title">{title}</h2>

            <div className="ProductsSlider__buttons">
              <button
                type="button"
                onClick={handlePrevClick}
                disabled={isPrevButtonDisabled}
                className={cn('ProductsSlider__button', {
                  disabled: isPrevButtonDisabled,
                })}
              >
                <img src={arrowLeft} alt="arrow-left" />
              </button>
              <button
                type="button"
                onClick={handleNextClick}
                disabled={isNextButtonDisabled}
                className={cn('ProductsSlider__button', {
                  disabled: isNextButtonDisabled,
                })}
              >
                <img src={arrowRight} alt="arrow-right" />
              </button>
            </div>
          </div>

          <div className="ProductsSlider__cards" data-cy="cardsContainer">
            {visibleCards.map((card) => (
              <div className="ProductsSlider__card" key={card.id}>
                <ProductCard product={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
