import type React from 'react';
import { COLOR_MAP } from '../../../../constants/color-map';
import type { Product } from '../../../../types/Product';
import styles from './ColorPanel.module.scss';

type Props = {
  product: Product;
  selectedColor: string;
  selectedCapacity: string;
  handleColorChange: (color: string) => void;
  findProduct: (color: string, capacity: string) => Product | undefined;
};

export const ColorPanel: React.FC<Props> = ({
  product,
  selectedColor,
  selectedCapacity,
  handleColorChange,
  findProduct,
}) => {
  return (
    <div className={styles['colors-panel']}>
      <span className={styles['label-text']}>Available colors</span>
      <div className={styles['colors-row']}>
        {product.colorsAvailable.map(color => {
          const isAvailable = Boolean(findProduct(color, selectedCapacity));

          return (
            <div key={color}>
              <input
                type="radio"
                name="color"
                id={color}
                value={color}
                checked={selectedColor === color}
                disabled={!isAvailable}
                onChange={() => handleColorChange(color)}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                className={`${styles['color-button']} ${
                  !isAvailable ? styles['color-button--disabled'] : ''
                }`}
                htmlFor={color}
              >
                <span
                  className={styles['color-circle']}
                  style={{ backgroundColor: COLOR_MAP[color] }}
                ></span>
              </label>
            </div>
          );
        })}
      </div>
      <span className={styles['product-id']}>ID: {product.id}</span>
    </div>
  );
};
