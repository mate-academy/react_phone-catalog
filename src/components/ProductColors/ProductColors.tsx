import { ProductDetailsType } from 'types/productInfoTypes';

import React from 'react';
import cn from 'classnames';
import styles from './ProductColors.module.scss';

interface ProductColorsProps {
  onColorSelect: (color: string) => void;
  productDetails: ProductDetailsType;
  selectedColor: string | null;
  productId: number | null;
}

export const ProductColors: React.FC<ProductColorsProps> = ({
  onColorSelect,
  productDetails,
  selectedColor,
  productId,
}) => {
  return (
    <div className={styles.product_colors}>
      <div className={cn(styles.product_colors__labels, 'small-text')}>
        <span>Available colors</span>

        <span className={styles.product_colors__labels_id}>
          {`ID: ${productId}`}
        </span>
      </div>

      <ul className={styles.product_colors__list}>
        {productDetails.colorsAvailable.map(color => (
          <li key={color} className={styles.product_colors__item}>
            <button
              className={cn(styles.product_colors__button, {
                [styles.selected]: selectedColor === color,
              })}
              onClick={() => onColorSelect(color)}
            >
              <div
                className={styles.product_colors__inside}
                style={{ background: color }}
              ></div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
