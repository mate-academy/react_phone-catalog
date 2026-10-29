import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../../../types';
import { COLORS } from '../../../../utils/colors';
import styles from './ProductOptions.module.scss';

type Props = {
  product: ProductDetails;
};

export const ProductOptions = ({ product }: Props) => {
  const navigate = useNavigate();

  const getVariantId = (capacity: string, color: string) =>
    `${product.namespaceId}-${capacity}-${color}`
      .toLowerCase()
      .replace(/ /g, '-');

  const goToVariant = (capacity: string, color: string) => {
    navigate(`/product/${getVariantId(capacity, color)}`);
  };

  return (
    <div>
      <p className={styles.label}>Available colors</p>
      <div className={styles.colors}>
        {product.colorsAvailable.map(color => (
          <label
            key={color}
            title={color}
            style={{ backgroundColor: COLORS[color] }}
            className={
              color === product.color
                ? `${styles.color} ${styles.active}`
                : styles.color
            }
          >
            <input
              type="radio"
              name="color"
              value={color}
              aria-label={color}
              checked={color === product.color}
              onChange={() => goToVariant(product.capacity, color)}
              className={styles.radio}
            />
          </label>
        ))}
      </div>

      <p className={styles.label}>Select capacity</p>
      <div className={styles.capacities}>
        {product.capacityAvailable.map(capacity => (
          <label
            key={capacity}
            className={
              capacity === product.capacity
                ? `${styles.capacity} ${styles.active}`
                : styles.capacity
            }
          >
            <input
              type="radio"
              name="capacity"
              value={capacity}
              checked={capacity === product.capacity}
              onChange={() => goToVariant(capacity, product.color)}
              className={styles.radio}
            />
            {capacity}
          </label>
        ))}
      </div>
    </div>
  );
};
