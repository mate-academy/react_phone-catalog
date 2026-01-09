import { Product } from '@/types/Product';
import { FC } from 'react';

import styles from './ProductsList.module.scss';
import { ProductCard } from '@/modules/shared/components/ProductCard';
import { ProductCardSkeleton } from '@/modules/shared/components/ProductCardSkeleton';
import { Message } from '@/modules/shared/components/Message';

interface Props {
  products: Product[];
  itemsPerPage: number;
  isLoading?: boolean;
  emptyMessage?: string;
}

export const ProductsList: FC<Props> = ({
  products,
  itemsPerPage,
  isLoading = false,
  emptyMessage = 'No available products',
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

  if (!isLoading && products.length === 0) {
    return (
      <Message>
        <Message.Icon>
          <img
            src="img/product-not-found.png"
            alt="No products"
            className={styles.emptyMessageIcon}
          />
        </Message.Icon>
        <Message.Title>{emptyMessage}</Message.Title>
      </Message>
      // <Message message={emptyMessage} imgPath="img/product-not-found.png" />
    );
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
