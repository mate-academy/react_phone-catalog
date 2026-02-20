import React from 'react';
import styles from './ProductPrice.module.scss';
import { Product } from '@/types/product';
import cn from 'classnames';

type Props = {
  isShowFullPrice: boolean;
  product: Product;
  customClassName?: string;
};

export const ProductPrice: React.FC<Props> = ({
  isShowFullPrice,
  product,
  customClassName,
}) => {
  const priceConainerClasses = cn(styles.productPrices, customClassName);

  return (
    <div className={priceConainerClasses}>
      <p className={styles.productPrice}>${product.price}</p>
      {isShowFullPrice && (
        <p className={styles.productFullPrice}>${product.fullPrice}</p>
      )}
    </div>
  );
};
