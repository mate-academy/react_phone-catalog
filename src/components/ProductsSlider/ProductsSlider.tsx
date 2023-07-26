import React, { useState } from 'react';

import arrowLeft from '../../images/arrows/arrow-left.svg';
import arrowRight from '../../images/arrows/arrow-right.svg';

import './ProductsSlider.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevClick = () => {
    setStartIndex((prevStartIndex) => Math.max(0, prevStartIndex - 1));
  };

  const handleNextClick = () => {
    setStartIndex((prevStartIndex) => Math.min(
      prevStartIndex + 1,
      products.length - 4,
    ));
  };

  const visibleCards = products.slice(startIndex, startIndex + 4);

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__content">
        <h2 className="ProductsSlider__title">{title}</h2>

        <div className="ProductsSlider__buttons">
          <button
            type="button"
            onClick={handlePrevClick}
            disabled={startIndex === 0}
            className="ProductsSlider__button"
          >
            <img src={arrowLeft} alt="arrow-left" />
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            disabled={startIndex === products.length - 4}
            className="ProductsSlider__button"
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
  );
};
