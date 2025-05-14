import React from 'react';
import styles from './ProductCharacteristics.module.scss';
import { Product } from '@/types/product';
import { ProductDetails } from '@/types/productDetails';
import { productCharacteristics } from '@/types/productCharacteristics';
import cn from 'classnames';

type Props = {
  product: Product | ProductDetails;
  characteristics: productCharacteristics[];
  customClassName?: string;
};

export const ProductCharacteristics: React.FC<Props> = ({
  product,
  characteristics,
  customClassName,
}) => {
  const customClassNames = cn(styles.productCharacteristics, customClassName);

  return (
    <div className={customClassNames}>
      {characteristics.map(({ key, name }) => {
        if (key in product) {
          return (
            <div key={key} className={styles.productCharacteristicsItem}>
              <p className={styles.productCharacteristicsName}>{name}</p>
              <p className={styles.productCharacteristicsValue}>
                {product[key as keyof (Product | ProductDetails)]}
              </p>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
