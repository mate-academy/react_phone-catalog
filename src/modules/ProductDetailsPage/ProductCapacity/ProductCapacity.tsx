import React from 'react';
import { ProductDetails } from '../../shared/types/ProductDetails';
import styles from './ProductCapacity.module.scss';
import classNames from 'classnames';

type Props = {
  onCapacitySelect: (capacity: string) => void;
  productDetails: ProductDetails;
};

export const ProductCapacity: React.FC<Props> = ({
  productDetails,
  onCapacitySelect,
}) => {
  return (
    <div className={styles.capacity}>
      <p className={styles.capacity__title}>Select capacity</p>

      <ul className={styles.capacity__list}>
        {productDetails.capacityAvailable.map(capacity => (
          <li key={capacity} className={styles.capacity__item}>
            <button
              className={classNames(styles.capacity__button, {
                [styles.selected]: productDetails.capacity === capacity,
              })}
              onClick={() => onCapacitySelect(capacity)}
            >
              {capacity}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
