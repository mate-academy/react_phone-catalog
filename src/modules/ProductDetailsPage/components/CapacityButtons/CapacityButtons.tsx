import { FC } from 'react';
import styles from './CapacityButtons.module.scss';
import classNames from 'classnames';
import { ProductDetails } from '../../../../types/ProductDetails';

interface Props {
  productDetails: ProductDetails;
  filterChange: (color: string, capacity: string) => Promise<void>;
}

export const CapacityButtons: FC<Props> = ({
  productDetails,
  filterChange,
}) => {
  return (
    <div className={styles.capacity}>
      <p className={styles.label}>Select Capacity</p>

      <div className={styles.capacityList}>
        {productDetails.capacityAvailable.map(capacity => (
          <button
            key={capacity}
            value={capacity}
            className={classNames(styles.capacityButton, {
              [styles.active]: productDetails.capacity === capacity,
            })}
            onClick={() => filterChange(productDetails.color, capacity)}
          >
            {capacity}
          </button>
        ))}
      </div>
    </div>
  );
};
