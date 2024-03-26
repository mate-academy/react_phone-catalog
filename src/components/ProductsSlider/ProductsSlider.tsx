import React from 'react';
import { Product } from '../../types/ProductType';
// import { getHotPriceProducts } from '../../helpers/products';

import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[];
  currentSlide: number;
};

export const ProductsSlider: React.FC<Props> = ({
  products,
  currentSlide,
}) => {
  return (
    <div className="content-container">
      <div className="slider-container" data-cy="cardsContainer">
        {products.slice(currentSlide, currentSlide + 4)
          .map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};
