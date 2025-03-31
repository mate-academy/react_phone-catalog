import { ProductDetailsType } from 'types/productInfoTypes';

import React from 'react';
import cn from 'classnames';
import styles from './ProductSmallSpecs.module.scss';

interface ProductSmallSpecsProps {
  productDetails: ProductDetailsType;
}

export const ProductSmallSpecs: React.FC<ProductSmallSpecsProps> = ({
  productDetails,
}) => {
  const productSmallSpecsMap = [
    { title: 'Screen', specs: 'screen' },
    { title: 'Resolution', specs: 'resolution' },
    { title: 'Processor', specs: 'processor' },
    { title: 'RAM', specs: 'ram' },
  ];

  return (
    <div className={styles.product_small_specs}>
      <ul className={styles.product_small_specs__list}>
        {productSmallSpecsMap.map(product => (
          <li
            key={product.specs}
            className={cn(styles.product_small_specs__item, 'small-text')}
          >
            <span className={styles.product_small_specs__property}>
              {product.title}
            </span>

            <span className={styles.product_small_specs__value}>
              {String(
                productDetails[product.specs as keyof ProductDetailsType],
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
