import React from 'react';
import classNames from '../../utils/classNames';
import { Product } from '../../types/product.types';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

interface Props {
  products: Product[];
  favouriteIds: Set<string>;
  cartIds: Set<string>;
  onToggleFavourite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  variant?: 'catalog' | 'compact';
}

export const ProductsList: React.FC<Props> = ({
  products,
  favouriteIds,
  cartIds,
  onToggleFavourite,
  onAddToCart,
  variant = 'catalog',
}) => {
  return (
    <ul className={classNames('products-list', `products-list--${variant}`)}>
      {products.map(product => (
        <li key={product.itemId} className="products-list__item">
          <ProductCard
            product={product}
            isFavourite={favouriteIds.has(product.itemId)}
            isInCart={cartIds.has(product.itemId)}
            onToggleFavourite={onToggleFavourite}
            onAddToCart={onAddToCart}
          />
        </li>
      ))}
    </ul>
  );
};
