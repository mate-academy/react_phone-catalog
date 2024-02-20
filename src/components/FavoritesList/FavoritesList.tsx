import React from 'react';
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
          product={product}
        />
      ))}
    </div>
  );
};
