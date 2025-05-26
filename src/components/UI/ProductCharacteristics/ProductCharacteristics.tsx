import React from 'react';
import styles from './ProductCharacteristics.module.scss';
import { Product } from '@/types/product';
import { ProductDetails } from '@/types/productDetails';
import { productCharacteristics } from '@/types/productCharacteristics';
import cn from 'classnames';

type Props = {
  product: Product | ProductDetails;
  characteristics: productCharacteristics[];
  customClassNameContainer?: string;
  customClassNameForName?: string;
  customClassNameForValue?: string;
};

export const ProductCharacteristics: React.FC<Props> = ({
  product,
  characteristics,
  customClassNameContainer,
  customClassNameForName,
  customClassNameForValue,
}) => {
  const customClassNames = cn(
    styles.productCharacteristics,
    customClassNameContainer,
  );

  return (
    <div className={customClassNames}>
      {characteristics.map(({ key, name }) => {
        if (key in product) {
          const value = product[key as keyof (Product | ProductDetails)];

          return (
            <div key={key} className={styles.productCharacteristicsItem}>
              <p
                className={cn(
                  styles.productCharacteristicsName,
                  customClassNameForName,
                )}
              >
                {name}
              </p>
              <p
                className={cn(
                  styles.productCharacteristicsValue,
                  customClassNameForValue,
                )}
              >
                {key === 'cell' && Array.isArray(value)
                  ? value.join(', ')
                  : value}
              </p>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
