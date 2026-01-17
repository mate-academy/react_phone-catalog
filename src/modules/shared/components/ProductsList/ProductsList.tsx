import { Product } from '@/types/Product';
import { FC, memo } from 'react';

import styles from './ProductsList.module.scss';
import { ProductCard } from '@/modules/shared/components/ProductCard';
import { ProductCardSkeleton } from '@/modules/shared/components/ProductCardSkeleton';

interface Props {
  products: Product[];
  itemsPerPage: number;
  isLoading?: boolean;
}

export const ProductsList: FC<Props> = memo(function ProductList({
  products,
  itemsPerPage,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <ul className={styles.products}>
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <li className={styles.productCard} key={`product-${index}-loader`}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <ul className={styles.products}>
      {products.map(product => (
        <li className={styles.productCard} key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
});
