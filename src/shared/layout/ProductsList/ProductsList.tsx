import React from 'react';
import { Products } from '../../../types/Products';
import styles from './ProductsList.module.scss';
import { ProductItem } from '../ProductItem';

type Props = {
  filteredProducts: Products[] | undefined;
};

export const ProductsList: React.FC<Props> = ({ filteredProducts }) => {
  return (
    <div className={styles['products-list']}>
      <div className={`${styles['products-list__container']}`}>
        {filteredProducts &&
          filteredProducts.map(product => (
            <div
              key={product.id}
              className={`${styles['products-list__item']}`}
            >
              <ProductItem product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};
