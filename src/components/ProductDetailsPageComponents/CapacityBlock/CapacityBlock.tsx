import { Link } from 'react-router-dom';
import styles from './CapacityBlock.module.scss';

interface Props {
  capacityAvailable: string[];
  currentCapacity: string;
  productId: string;
}

export const CapacityBlock: React.FC<Props> = ({
  capacityAvailable,
  currentCapacity,
  productId,
}) => {
  return (
    <div className={styles.capacityBlock}>
      <span className={styles.labelCapacity}>Select capacity</span>
      <div className={styles.capacityList}>
        {capacityAvailable.map((capacity: string) => {
          const currentCapFormatted = currentCapacity
            .toLowerCase()
            .replace(' ', '');
          const newCapFormatted = capacity.toLowerCase().replace(' ', '');
          const newProductId = productId.replace(
            currentCapFormatted,
            newCapFormatted,
          );

          return (
            <Link
              key={capacity}
              to={`/product/${newProductId}`}
              className={`${styles.capacityButton} ${
                currentCapacity === capacity ? styles.capacityButtonActive : ''
              }`}
            >
              <p className={styles.text}>{capacity}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
