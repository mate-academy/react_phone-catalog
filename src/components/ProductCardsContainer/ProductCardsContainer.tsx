import { useState } from 'react';

import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/product';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { Button } from '../Button/Button';

import './ProductCardsContainer.scss';

type CardsContainerProps = {
  title: string;
  products: Product[];
};

export const ProductCardsContainer = ({
  title,
  products,
}: CardsContainerProps) => {
  const [page, setPage] = useState(0);

  const maxTransition = (products.length / 4) - 1;

  const handleClick = (operation: 1 | -1) => {
    setPage((prevPage) => {
      if (operation === 1) {
        return Math.min(maxTransition, prevPage + 1);
      }

      return Math.max(0, prevPage - 1);
    });
  };

  return (
    <div className="cards-container">
      <div className="cards-container__header">
        <h1 className="cards-container__title">{title}</h1>

        <div className="cards-container__controls">
          <Button
            onClick={() => handleClick(-1)}
            arrow="left"
            isDisabled={page === 0}
            alt="Sliders left arrow button"
            size="small"
          />
          <Button
            onClick={() => handleClick(1)}
            arrow="right"
            isDisabled={page === maxTransition}
            alt="Sliders right arrow button"
            size="small"
          />
        </div>
      </div>

      <ProductSlider page={page}>
        {products.map((product) => (
          <ProductCard onLoad={() => {}} key={product.id} product={product} />
        ))}
      </ProductSlider>
    </div>
  );
};
