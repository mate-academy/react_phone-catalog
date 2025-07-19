import React from 'react';
import styles from './ProductMemory.module.scss';

type Props = {
  capacities: string[];
  currentCapacity: string;
  onCapacityChange: (capacity: string) => void;
};

export const ProductMemory: React.FC<Props> = ({
  capacities,
  currentCapacity,
  onCapacityChange,
}) => {
  return (
    <div className={styles.memory}>
      <h4 className={styles.label}>Available capacities</h4>

      <div className={styles.memoryList}>
        {capacities.map(capacity => {
          const inputId = `capacity-${capacity}`;

          return (
            <div key={inputId} className={styles.memoryWrapper}>
              <input
                type="radio"
                id={inputId}
                name="product-capacity"
                value={capacity}
                checked={capacity === currentCapacity}
                onChange={() => onCapacityChange(capacity)}
                className={styles.input}
              />

              <label
                htmlFor={inputId}
                className={`${styles.capacity} ${
                  capacity === currentCapacity ? styles.active : ''
                }`}
              >
                {capacity}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
