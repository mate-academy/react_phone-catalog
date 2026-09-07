import { Product } from 'types/Product';
import styles from './ProductInfoDisplay.module.scss';

type ProductInfoDisplayProps = {
  product: Product;
};

export const ProductInfoDisplay = ({ product }: ProductInfoDisplayProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__info}>
        <span className={styles.container__info__title}>Screen</span>
        <span className={styles.container__info__value}>{product.screen}</span>
      </div>
      <div className={styles.container__info}>
        <span className={styles.container__info__title}>Capacity</span>
        <span className={styles.container__info__value}>
          {product.capacity}
        </span>
      </div>
      <div className={styles.container__info}>
        <span className={styles.container__info__title}>RAM</span>
        <span className={styles.container__info__value}>{product.ram}</span>
      </div>
    </div>
  );
};
