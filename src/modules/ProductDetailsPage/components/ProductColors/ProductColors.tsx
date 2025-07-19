import React from 'react';
import styles from './ProductColors.module.scss';

type Props = {
  colorsAvailable: string[];
  currentColor: string;
  onColorChange: (color: string) => void;
};

export const ProductColors: React.FC<Props> = ({
  colorsAvailable,
  currentColor,
  onColorChange,
}) => {
  return (
    <div className={styles.colors}>
      <div className={styles.colorList}>
        {colorsAvailable.map(color => {
          const inputId = `color-${String(color)}`;

          return (
            <div key={inputId} className={styles.colorWrapper}>
              <input
                type="radio"
                id={inputId}
                name="product-color"
                value={color}
                checked={color === currentColor}
                onChange={() => onColorChange(color)}
                className={styles.input}
              />

              <label
                htmlFor={inputId}
                className={`${styles.colorCircle} ${
                  color === currentColor ? styles.active : ''
                }`}
                aria-label={color}
              >
                <span
                  className={styles.colorInner}
                  style={{ backgroundColor: color }}
                ></span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
