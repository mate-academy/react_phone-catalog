import React from 'react';
import styles from './ProductSpecs.module.scss';
import {
  addSpace,
  capitalizeFirstLetter,
} from '../../../../_utils/stringFunction';
import {
  Product,
  ProductKeys,
  ProductWithDetails,
} from '../../../../_types/products';
import classNames from 'classnames';

type Props<T extends Product | ProductWithDetails> = {
  product: T;
  keys: ProductKeys[];
  bodyText?: boolean;
};

type Labels = {
  [key in ProductKeys]?: string;
};

const LABELS: Labels = {
  capacity: 'Built in memory',
  ram: 'RAM',
};

const ProductSpecs = <T extends Product | ProductWithDetails>({
  product,
  keys,
  bodyText = false,
}: Props<T>) => {
  const getValue = (key: string): string | null => {
    if (key in product) {
      return String(product[key as keyof Product]);
    }

    if ('details' in product && product.details && key in product.details) {
      return String(product.details[key as keyof typeof product.details]);
    }

    return null;
  };

  return (
    <ul className={styles['product-specs']}>
      {keys.map(key => {
        const value = getValue(String(key));

        return value !== null ? (
          <li key={String(key)} className={styles['product-specs__item']}>
            <div
              className={classNames(styles['product-specs__title'], {
                [styles['product-specs__title--bodyText']]: bodyText,
              })}
            >
              {LABELS[key] || capitalizeFirstLetter(String(key))}
            </div>
            <div
              className={classNames(styles['product-specs__value'], {
                [styles['product-specs__value--bodyText']]: bodyText,
              })}
            >
              {addSpace(value)}
            </div>
          </li>
        ) : null;
      })}
    </ul>
  );
};

export default React.memo(ProductSpecs);
