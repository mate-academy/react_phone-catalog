import type React from 'react';

import styles from './CapacityPanel.module.scss';
import type { Product } from '../../../../types/Product';

type Props = {
  selectedCapacity: string;
  selectedColor: string;
  capacityAvailable: string[];
  findProduct: (color: string, capacity: string) => Product | undefined;
  handleCapacityChange: (capacity: string) => void;
};

export const CapacityPanel: React.FC<Props> = ({
  selectedCapacity,
  selectedColor,
  capacityAvailable,
  findProduct,
  handleCapacityChange,
}) => {
  return (
    <div className={styles['capacity-panel']}>
      <span className={styles['label-text']}>Select capacity</span>
      <div className={styles['capacity-row']}>
        {capacityAvailable.map(capacity => {
          const isAvailable = Boolean(findProduct(selectedColor, capacity));

          return (
            <div key={capacity}>
              <input
                type="radio"
                name="capacity"
                id={capacity}
                value={capacity}
                checked={selectedCapacity === capacity}
                disabled={!isAvailable}
                onChange={() => handleCapacityChange(capacity)}
              />
              <label
                className={`${styles['capacity-button']} ${
                  !isAvailable ? styles['capacity-button--disabled'] : ''
                }`}
                htmlFor={capacity}
              >
                <span className={styles['capacity-text']}>{capacity}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
