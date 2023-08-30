import React from 'react';

import ProductCard from './ProductCard';

import { Product } from '../../types/Phone';

import { transformStyle } from '../../utils/transformStyle';

interface Props {
  visibleProducts: Product[];
  index: number;
}

const BrowseProducts: React.FC<Props> = ({ visibleProducts, index }) => {
  return (
    <div className="slider-wrapper">
      <div
        className="browse-products"
        style={transformStyle(index)}
      >
        {visibleProducts?.map((product: Product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default BrowseProducts;
