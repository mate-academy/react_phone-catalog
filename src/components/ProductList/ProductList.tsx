import React, { memo } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import productListStyles from './ProductList.module.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = memo(({ products }) => {
  return (
    <section className={productListStyles.products}>
      <ul className={productListStyles.products__list}>
        {products.map(product => (
          <li key={product.id} className={productListStyles.products__listItem}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
});

ProductList.displayName = 'ProductList';
