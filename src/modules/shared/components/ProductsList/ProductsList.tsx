import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import { Loader } from '../Loader';
import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
  emptyMessage: string;
  onReload?: () => void;
}

export const ProductsList: React.FC<Props> = ({
  products,
  isLoading,
  hasError,
  emptyMessage,
  onReload,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorMessage}>Something went wrong</p>
        {onReload && (
          <button
            type="button"
            className={styles.reloadButton}
            onClick={onReload}
          >
            Reload
          </button>
        )}
      </div>
    );
  }

  if (products.length === 0) {
    return <p className={styles.message}>{emptyMessage}</p>;
  }

  return (
    <ul className={styles.grid}>
      {products.map(product => (
        <li key={`${product.category}-${product.itemId}`}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
