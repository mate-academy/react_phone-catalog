import { Product } from '@/types/Product';
import { FC } from 'react';

import styles from './ProductsList.module.scss';
import { ProductCard } from '@/modules/shared/components/ProductCard';
import { ProductCardSkeleton } from '@/modules/shared/components/ProductCardSkeleton';

interface Props {
  products: Product[];
  itemsPerPage: number;
  isLoading?: boolean;
}

export const ProductsList: FC<Props> = ({
  products,
  itemsPerPage,
  isLoading = false,
}) => {
  return (
    <ul className={styles.products}>
      {isLoading &&
        Array.from({ length: itemsPerPage }).map((_, index) => (
          <li className={styles.productCard} key={`product-${index}-loader`}>
            <ProductCardSkeleton />
          </li>
        ))}
      {!isLoading &&
        products.map(product => (
          <li className={styles.productCard} key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
    </ul>
  );
};
