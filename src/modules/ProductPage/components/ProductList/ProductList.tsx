import React from 'react';
import { ProductForCard } from '../../../../types/Product/Product';
import { ProductCard } from '../../../../shared/components/ProductCard';
// eslint-disable-next-line max-len
import { ProductCardSkeleton } from '../../../../shared/components/ProductCardSkeleton';

import styles from './ProductList.module.scss';

type Props = {
  products: ProductForCard[];
  loading?: boolean;
  skeletonsCount?: number;
  categoryLabel?: string;
};

export const ProductList: React.FC<Props> = ({
  products,
  loading,
  skeletonsCount,
  categoryLabel = 'products',
}) => {
  if (loading) {
    return (
      <div className={styles.productList}>
        {Array.from({ length: skeletonsCount ?? 0 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div>There are no {categoryLabel} yet</div>;
  }

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
