import type React from 'react';
import type { Product } from '../../../../types/Product';
import { ProductCard } from '../../../shared/components/ProductCard';

import styles from './ProductList.module.scss';
import { EmptyList } from '../EmptyList';
import type { ProductCategories } from '../../../../types/ProductCategories';

type Props = {
  products: Product[];
  category: ProductCategories;
};

export const ProductList: React.FC<Props> = ({ products, category }) => {
  return (
    <>
      {products.length === 0 ? (
        <EmptyList category={category} />
      ) : (
        <div className={styles['product-list']}>
          {products.map(product => (
            <ProductCard
              product={product}
              key={product.id}
              classname={styles['product-card']}
            />
          ))}
        </div>
      )}
    </>
  );
};
