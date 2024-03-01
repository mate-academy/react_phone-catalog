import React from 'react';
import { v4 as getId } from 'uuid';

import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem/ProductItem';

type Props = {
  favoriteProducts: Product[],
};

export const FavoritesList: React.FC<Props> = ({
  favoriteProducts,
}) => {
  return (
    <div className="favorites__products-list">
      {favoriteProducts.map(product => (
        <ProductItem
          key={getId()}
          product={product}
        />
      ))}
    </div>
  );
};
