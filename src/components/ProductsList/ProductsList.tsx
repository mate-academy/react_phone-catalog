import React, { forwardRef } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';
import cn from 'classnames';

type Props = {
  products: Product[];
  variant?: 'grid' | 'slider';
};

// ZMIANA: Używamy forwardRef, aby rodzic mógł sterować przewijaniem
export const ProductsList = forwardRef<HTMLDivElement, Props>(
  ({ products, variant = 'grid' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.container, {
          [styles.grid]: variant === 'grid',
          [styles.slider]: variant === 'slider',
        })}
      >
        {products.map(product => (
          <div key={product.id} className={styles.cardWrapper}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  },
);

ProductsList.displayName = 'ProductsList';
