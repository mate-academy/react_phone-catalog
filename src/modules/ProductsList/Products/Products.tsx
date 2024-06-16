import React from 'react';
import { Product } from '../../../utils/types/Product';
import { ShopCard } from '../../ShopCard';
import styles from './Products.module.scss';

type Props = {
  data: Product[];
};

export const Products: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.Products}>
      <div className={styles.Products__wrapper}>
        {data?.map(product => (
          <ShopCard key={product.id} product={product} isDiscount={false} />
        ))}
      </div>
    </div>
  );
};
