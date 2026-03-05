import React from 'react';
import { PathType, Product } from '../../../types/Types';
import { useNavigate } from 'react-router-dom';
import styles from './CapacitySelector.module.scss';

interface CapacitySelectorProps {
  product: Product;
}

export const CapacitySelector: React.FC<CapacitySelectorProps> = ({
  product,
}) => {
  const navigate = useNavigate();

  const handleCapacityChange = (newCapacity: string) => {
    const capacityFormatted = newCapacity.toLowerCase();
    const colorFormatted = product.color.toLowerCase().replace(/\s+/g, '-');
    const newItemId = `${product.namespaceId}-${capacityFormatted}-${colorFormatted}`;

    navigate(`${PathType.PRODUCT}/${newItemId}`);
  };

  return (
    <div className={styles.capacitySelector}>
      <div className={styles.capacitySelector__info}>
        <span className={styles.capacitySelector__availableCapacity}>
          Select capacity
        </span>

        <div className={styles.capacitySelector__capacity}>
          {product.capacityAvailable.map(capacity => {
            return (
              <label
                key={capacity}
                className={`${styles.capacitySelector__label} ${
                  capacity === product.capacity
                    ? styles['capacitySelector__label--active']
                    : ''
                }`}
              >
                <span className={styles.capacitySelector__visuallyHidden}>
                  {capacity}
                </span>
                <input
                  type="radio"
                  name={`capacity-${product.id}`}
                  value={capacity}
                  checked={capacity === product.capacity}
                  onChange={() => handleCapacityChange(capacity)}
                  className={styles.capacitySelector__radio}
                />
                {capacity}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
