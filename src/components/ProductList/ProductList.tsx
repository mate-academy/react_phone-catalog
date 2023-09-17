import React, { FC } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

type ProductListProps = {
  styles: string;
  products: Product[];
  updateFavourites?: () => void;
};

export const ProductList: FC<ProductListProps> = ({
  products,
  styles,
  updateFavourites,
}) => {
  return (
    <div className={styles} data-cy="productList">
      {products.map(product => (
        <React.Fragment
          key={product.id}
          data-cy="cardsContainer"
        >
          <ProductCard
            product={product}
            updateFavourites={updateFavourites}
          />
        </React.Fragment>
      ))}
    </div>
  );
};
