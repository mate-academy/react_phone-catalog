import React from 'react';
import { Product } from '../../../../api/products';
import styles from './ProductOptions.module.scss';
import classNames from 'classnames';
import { COLOR_MAP } from '../../../../api/ColorMap';

interface Props {
  product: Product;
  currentColor: string;
  currentCapacity: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
}

export const ProductOptions: React.FC<Props> = ({
  product,
  currentColor,
  currentCapacity,
  onColorChange,
  onCapacityChange,
}) => {
  return (
    <div className={styles.productOptions}>
      {product.colorsAvailable && (
        <div className={styles.productOptions__colorsRow}>
          <h5 className={styles.productOptions__label}>Available colors</h5>
          <div
            className={styles.productOptions__colors}
            role="radiogroup"
            aria-label="Available colors"
          >
            {product.colorsAvailable.map((c: string) => (
              <label
                key={c}
                className={classNames(styles.productOptions__color, {
                  [styles['productOptions__color--active']]: c === currentColor,
                })}
              >
                <span
                  className={styles.productOptions__colorInternal}
                  style={{ background: COLOR_MAP[c] || c }}
                />
                <input
                  type="radio"
                  aria-label={c}
                  name="color"
                  onChange={() => onColorChange(c)}
                  className={styles.productOptions__colorRadio}
                  checked={c === currentColor}
                />
              </label>
            ))}
          </div>
        </div>
      )}
      <div className={styles.productOptions__line} />
      {product.capacityAvailable && (
        <div className={styles.productOptions__capacityRow}>
          <h5 className={styles.productOptions__label}>Select capacity</h5>
          <div
            className={styles.productOptions__capacities}
            role="radiogroup"
            aria-label="Select capacity"
          >
            {product.capacityAvailable.map(c => (
              <label
                key={c}
                className={classNames(styles.productOptions__capacity, {
                  [styles['productOptions__capacity--active']]:
                    c === currentCapacity,
                })}
              >
                <input
                  type="radio"
                  name="capacity"
                  onChange={() => onCapacityChange(c)}
                  className={styles.productOptions__capacityRadio}
                  checked={c === currentCapacity}
                />
                {c}
              </label>
            ))}
          </div>
        </div>
      )}
      <div className={styles.productOptions__line} />
    </div>
  );
};
