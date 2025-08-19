import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') ?? '').trim();

  const filtered = useMemo(() => {
    if (!query) {
      return products;
    }

    const q = query.toLowerCase();

    return products.filter(p => p.name.toLowerCase().includes(q));
  }, [products, query]);

  if (!products || products.length === 0) {
    return <div>There are no {categoryLabel} yet</div>;
  }

  if (query && filtered.length === 0) {
    return <div>There are no {categoryLabel} matching the query</div>;
  }

  if (loading) {
    return (
      <div className={styles.productList}>
        {Array.from({ length: skeletonsCount ?? 0 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.productList}>
      {filtered.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
