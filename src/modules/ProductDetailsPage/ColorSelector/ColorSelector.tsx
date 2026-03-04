import React from 'react';
import { Product } from '../../../types/Types';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ColorSelector.module.scss';

interface ColorSelectorProps {
  product: Product;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ product }) => {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleColorChange = (newColor: string) => {
    const capacityFormatted = product.capacity
      ? product.capacity.toLowerCase()
      : '';
    const colorFormatted = newColor.toLowerCase().replace(/\s+/g, '-');
    const newItemId = `${product.namespaceId}-${capacityFormatted}-${colorFormatted}`;

    navigate(`/${category}/${newItemId}`);
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
              <button
                key={color}
                className={`${styles.colorSelector__button} ${
                  color === product.color
                    ? styles['colorSelector__button--active']
                    : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              ></button>
            );
          })}
        </div>
      </div>
      <span className={styles.colorSelector__id}>{product.id}</span>
    </div>
  );
};
