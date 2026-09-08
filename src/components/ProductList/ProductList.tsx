import { useEffect, useState } from 'react';

import { Card } from '../../types/card';
import { ProductCard } from '../ProductCard';
import { ProductCardSkeleton } from '../Skeleton';
import styles from './ProductList.module.scss';

type Props = {
  products: Card[];
  category?: string;
};

export const ProductList: React.FC<Props> = ({ products, category }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, [category]);

  return (
    <div className={styles.product_list}>
      {isLoading ? (
        <>
          {products.map(product => {
            return <ProductCardSkeleton key={product.id} />;
          })}
        </>
      ) : (
        <>
          {products.map(product => {
            return (
              <ProductCard key={product.id} card={product} discount={true} />
            );
          })}
        </>
      )}
    </div>
  );
};
