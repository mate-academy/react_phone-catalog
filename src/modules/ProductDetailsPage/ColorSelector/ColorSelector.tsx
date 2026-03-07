import React from 'react';
import { PathType, Product } from '../../../types/Types';
import { useNavigate, useParams } from 'react-router-dom';
import { getColorHex } from '../../../utils/helpers';
import styles from './ColorSelector.module.scss';

interface ColorSelectorProps {
  product: Product;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ product }) => {
  const navigate = useNavigate();
  const {} = useParams();

  const handleColorChange = (newColor: string) => {
    const capacityFormatted = product.capacity
      ? product.capacity.toLowerCase()
      : '';
    const colorFormatted = newColor.toLowerCase().replace(/\s+/g, '-');
    const newItemId = `${product.namespaceId}-${capacityFormatted}-${colorFormatted}`;

    navigate(`${PathType.PRODUCT}/${newItemId}`);
  };

  return (
    <div className={styles.colorSelector}>
      <div className={styles.colorSelector__info}>
        <span className={styles.colorSelector__availableColors}>
          Available colors
        </span>

        <div className={styles.colorSelector__colors}>
          {product.colorsAvailable?.map(color => {
            return (
              <label
                key={color}
                className={`${styles.colorSelector__label} ${
                  color === product.color
                    ? styles['colorSelector__label--active']
                    : ''
                }`}
                style={{ backgroundColor: getColorHex(color) }}
              >
                <span className={styles.colorSelector__visuallyHidden}>
                  Color {color}
                </span>
                <input
                  type="radio"
                  name={`color-${product.id}`}
                  value={color}
                  checked={color === product.color}
                  onChange={() => handleColorChange(color)}
                  className={styles.colorSelector__radio}
                />
              </label>
            );
          })}
        </div>
      </div>
      <span className={styles.colorSelector__id}>{product.namespaceId}</span>
    </div>
  );
};
