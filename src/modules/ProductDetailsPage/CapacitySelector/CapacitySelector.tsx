import React from 'react';
import { Product } from '../../../types/Types';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CapacitySelector.module.scss';

interface CapacitySelectorProps {
  product: Product;
}

export const CapacitySelector: React.FC<CapacitySelectorProps> = ({
  product,
}) => {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleCapacityChange = (newCapacity: string) => {
    const capacityFormatted = newCapacity.toLowerCase();
    const colorFormatted = product.color.toLowerCase().replace(/\s+/g, '-');
    const newItemId = `${product.namespaceId}-${capacityFormatted}-${colorFormatted}`;

    navigate(`/${category}/${newItemId}`);
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
              <button
                key={capacity}
                className={`${styles.capacitySelector__button} ${
                  capacity === product.capacity
                    ? styles['capacitySelector__button--active']
                    : ''
                }`}
                onClick={() => handleCapacityChange(capacity)}
              >
                {capacity}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
