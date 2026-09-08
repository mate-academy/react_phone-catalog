import React from 'react';
import { ProductDetails } from '../../shared/types/ProductDetails';
import styles from './ProductColors.module.scss';
import classNames from 'classnames';
import { colors } from '../../shared/constants/colors';

type Props = {
  onColorSelect: (color: string) => void;
  productDetails: ProductDetails;
  selectedColor: string | null;
  productId: number | null;
};

export const ProductColors: React.FC<Props> = ({
  onColorSelect,
  productDetails,
  selectedColor,
  productId,
}) => {
  return (
    <div className={styles.colors}>
      <div className={styles.colors__labels}>
        <span>Available colors</span>

        <span className={styles['color__labels-id']}>{`ID: ${productId}`}</span>
      </div>
      <ul className={styles.colors__list}>
        {productDetails.colorsAvailable.map(color => (
          <li key={color} className={styles.colors__item}>
            <button
              className={classNames(styles.colors__button, {
                [styles.selected]: selectedColor === color,
              })}
              onClick={() => onColorSelect(color)}
            >
              <div
                className={styles.colors__inside}
                style={{
                  backgroundColor:
                    colors[color as keyof typeof colors] || color,
                }}
              ></div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
