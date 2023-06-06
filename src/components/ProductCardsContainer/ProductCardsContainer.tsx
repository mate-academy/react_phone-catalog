import { useState } from 'react';

import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/product';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import leftArrow from '../../assets/l_arrow.svg';
import rightArrow from '../../assets/r_arrow.svg';

import './ProductCardsContainer.scss';

type CardsContainerProps = {
  title: string;
  products: Product[];
};

const width = 1136;
const toSlide = (272 + 16) / width;

export const ProductCardsContainer = ({
  title,
  products,
}: CardsContainerProps) => {
  const [page, setPage] = useState(0);

  const maxTransition = toSlide * (products.length - 4);

  const handleClick = (operation: 1 | -1) => {
    setPage((prevPage) => {
      if (operation === 1) {
        return Math.min(maxTransition, prevPage + toSlide * 4);
      }

      return Math.max(0, prevPage - toSlide * 4);
    });
  };

  return (
    <div className="cards-container">
      <div className="cards-container__header">
        <h1 className="cards-container__title">{title}</h1>

        <div className="cards-container__controls">
          <button
            className="cards-container__button"
            type="button"
            onClick={() => handleClick(-1)}
            disabled={page === 0}
          >
            <img
              src={leftArrow}
              alt="Left arrow button to control the slider"
            />
          </button>
          <button
            className="cards-container__button"
            type="button"
            onClick={() => handleClick(1)}
            disabled={page === maxTransition}
          >
            <img
              src={rightArrow}
              alt="Right arrow button to control the slider"
            />
          </button>
        </div>
      </div>

      <ProductSlider page={page} width={width}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductSlider>
    </div>
  );
};
