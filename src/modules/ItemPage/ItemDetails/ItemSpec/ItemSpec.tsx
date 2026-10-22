import styles from './ItemSpec.module.scss';
import type { ProductDetails } from '../../../../types/ProductDetails';

interface ItemSpecProps {
  product: ProductDetails;
}

export const ItemSpec = ({ product }: ItemSpecProps) => {
  return (
    <div className={styles.specs}>
      <h2>Tech specs</h2>

      <div className={styles.row}>
        <span>Screen</span>
        <span>{product.screen}</span>
      </div>

      <div className={styles.row}>
        <span>Resolution</span>
        <span>{product.resolution}</span>
      </div>

      <div className={styles.row}>
        <span>Processor</span>
        <span>{product.processor}</span>
      </div>

      <div className={styles.row}>
        <span>RAM</span>
        <span>{product.ram}</span>
      </div>

      <div className={styles.row}>
        <span>Capacity</span>
        <span>{product.capacity}</span>
      </div>

      <div className={styles.row}>
        <span>Color</span>
        <span>{product.color}</span>
      </div>
    </div>
  );
};
