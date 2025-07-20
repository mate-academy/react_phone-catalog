import type { FC } from 'react';
import type { Product } from '../../../types/product';
import { ProductCard } from '../../Product/ProductCard';
import { SkeletonCard } from '../../Skeleton';
import styles from './ProductsListSection.module.scss';

interface ProductsListSectionProps {
  isLoading: boolean;
  productsFromServer: Product[];
  itemsOnPage: string | number;
}

export const ProductsListSection: FC<ProductsListSectionProps> = ({
  isLoading,
  productsFromServer,
  itemsOnPage,
}) => {
  if (isLoading) {
    const skeletonCount = itemsOnPage === 'all' ? 8 : Number(itemsOnPage);

    return (
      <div className={styles.productsList}>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <div
            key={index}
            className={styles.card}
          >
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.productsList}>
      {productsFromServer.map((product) => (
        <div
          key={product.id}
          className={styles.card}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
