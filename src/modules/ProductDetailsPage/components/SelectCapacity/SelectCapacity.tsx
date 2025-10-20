import { useProduct } from '../../hooks/ProductContext';
import styles from './SelectCapacity.module.scss';

export const SelectCapacity = () => {
  const { product, setActiveCapacity, activeCapacity } = useProduct();

  return (
    <div className={styles.selectCapacity}>
      <div className={styles.titleAvailable}>Select capacity</div>

      <div className={styles.capacityList}>
        {product.details?.capacityAvailable?.map(c => (
          <div
            key={c}
            onClick={() => setActiveCapacity(c)}
            className={`${styles.capacity} ${activeCapacity === c ? styles.activeCapacity : ''}`}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
};
