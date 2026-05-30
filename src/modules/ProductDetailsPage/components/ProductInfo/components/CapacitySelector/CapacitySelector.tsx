import React from 'react';
import styles from './CapacitySelector.module.scss';
import { Goods } from '../../../../../../types/Goods';

type Props = {
  product: Goods;
  handleChangeParam: (value: string, key: string) => void;
  capacity: string;
};

export const CapacitySelector: React.FC<Props> = ({
  product,
  handleChangeParam,
  capacity,
}) => {
  return (
    <div className={`${styles['product-info__capacity']} ${styles.capacity}`}>
      <div className={styles.capacity__title}>Select capacity</div>
      <div className={styles.capacity__items}>
        {product.capacityAvailable.map(cap => (
          <div
            key={cap}
            className={`${styles.capacity__item} ${capacity === cap.toLocaleLowerCase() ? styles.capacity__active : ''}`}
            onClick={() => handleChangeParam(cap, 'capacity')}
          >
            {cap}
          </div>
        ))}
      </div>
    </div>
  );
};
