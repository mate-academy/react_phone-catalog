import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './CapacityPicker.module.scss';

type Props = {
  activeCapacity?: string;
  capacity: string[] | string;
};

export const CapacityPicker: React.FC<Props> = ({
  activeCapacity,
  capacity,
}) => {
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(
    activeCapacity || null,
  );
  const capacityArray = typeof capacity === 'string' ? [capacity] : capacity;

  useEffect(() => {
    if (activeCapacity) {
      setSelectedCapacity(activeCapacity);
    }
  }, [activeCapacity]);

  return (
    <div className={styles.capacityPicker}>
      {capacityArray.map(item => (
        <label
          key={item}
          className={classNames(styles.capacityPickerContainer, {
            [styles.capacityPickerContainerSelected]: selectedCapacity === item,
          })}
        >
          <input
            type="radio"
            name="capacity"
            value={item}
            checked={selectedCapacity === item}
            onChange={() => setSelectedCapacity(item)}
            className={styles.capacityPickerRadio}
          />
          <span className={styles.capacityPickerText}>
            {item.replace(/(\d+)(GB)/, '$1 $2')}
          </span>
        </label>
      ))}
    </div>
  );
};
