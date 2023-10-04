import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

type ProductListProps = {
  styles: string;
  products: Product[];
  updateFavourites?: () => void;
};

export const ProductList: React.FC<ProductListProps> = ({
  products,
  styles,
  updateFavourites,
}) => {
  return (
    <div className={styles} data-cy="productList">
      {products.map(product => (
        <div
          key={product.id}
          data-cy="cardsContainer"
        >
          <ProductCard
            product={product}
            updateFavourites={updateFavourites}
          />
        </div>
      ))}
    </div>
  );
};
