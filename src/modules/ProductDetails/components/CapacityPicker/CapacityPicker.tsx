import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CapacityPicker.module.scss';
import classNames from 'classnames';

interface CapacityPickerProps {
  capacity: string[];
  currentCapacity: string;
  getNewPath: (capacity: string) => string;
  className;
}

export const CapacityPicker: React.FC<CapacityPickerProps> = ({
  capacity,
  currentCapacity,
  getNewPath,
  className,
}) => {
  return (
    <div className={classNames(styles.capacitySelectionBox, className)}>
      <p className={styles.label}>Available capacity</p>
      <div className={styles.capacitySelection}>
        {capacity.map(cap => (
          <Link
            to={getNewPath(cap)}
            key={cap}
            className={`${styles.capacityButton} ${currentCapacity === cap ? styles.active : ''}`}
          >
            {cap}
          </Link>
        ))}
      </div>
    </div>
  );
};
