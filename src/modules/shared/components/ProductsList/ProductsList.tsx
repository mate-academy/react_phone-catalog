import { Product } from '@/types/Product';
import { FC } from 'react';

import styles from './ProductsList.module.scss';
import { ProductCard } from '@/modules/shared/components/ProductCard';
import { ProductCardSkeleton } from '@/modules/shared/components/ProductCardSkeleton';
import { ErrorMessage } from '../ErrorMessage';
import { EmptyMessage } from '../EmptyMessage';

interface Props {
  products: Product[];
  itemsPerPage: number;
  isLoading?: boolean;
  emptyMessage?: string;
  error?: string;
  onRefetch?: () => void;
}

export const ProductsList: FC<Props> = ({
  products,
  itemsPerPage,
  isLoading = false,
  emptyMessage = 'No available products',
  error,
  onRefetch = () => {},
}) => {
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

  if (error) {
    return <ErrorMessage message={error} onRetry={onRefetch} />;
  }

  if (!isLoading && products.length === 0) {
    return <EmptyMessage message={emptyMessage} />;
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
};
