import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';
import { SkeletonProductCard } from '../../Skeletons/SkeletonProductCard';

type Props = {
  products?: Product[];
  skeletonLenght?: number;
};

const ProductsListComponent: React.FC<Props> = ({
  products,
  skeletonLenght = 0,
}) => {
  return (
    <div className={styles.productsList}>
      {skeletonLenght > 0 &&
        Array.from({ length: skeletonLenght }).map((_, i) => (
          <SkeletonProductCard key={i} />
        ))}
      {products?.length &&
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export const ProductsList = React.memo(ProductsListComponent);
