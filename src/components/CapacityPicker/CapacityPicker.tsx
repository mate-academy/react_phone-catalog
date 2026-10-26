import cn from 'classnames';
import { ProductDetails } from 'src/types/Types';
import { useProductOptions } from 'src/hooks/useProductOptions';
import styles from './CapacityPicker.module.scss';
import { HTMLAttributes } from 'react';

type Props = {
  currentProduct: ProductDetails;
} & HTMLAttributes<HTMLDivElement>;

export const CapacityPicker = ({ currentProduct, className }: Props) => {
  const handleProductChange = useProductOptions();

  const activeCapacity = currentProduct.capacity;
  const capacityAvailable = currentProduct.capacityAvailable;

  return (
    <div className={cn(styles.capacityPicker, className)}>
      <p className={styles.title}>Select capacity</p>
      <ul className={styles.list}>
        {capacityAvailable.map(capacity => (
          <li key={capacity} className={styles.listItem}>
            <button
              title={capacity}
              className={cn(
                styles.button,
                activeCapacity === capacity && styles.active,
              )}
              onClick={() =>
                handleProductChange(currentProduct, { capacity: capacity })
              }
            >
              {capacity}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
