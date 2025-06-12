import { ProductData } from '../../../types/ProductData';
import styles from './ProductDescription.module.scss';

type Props = {
  product: ProductData | null;
};

export const ProductDescription: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.product__description}>
      <h2 className={styles.product__description__title}>About</h2>
      {product?.description.map((description, index) => (
        <div key={index} className={styles.product__description__box}>
          <h2
            className={`${styles.product__description__title} ${styles['product__description__title--second']}`}
          >
            {description.title}
          </h2>
          <span className={styles['product__description__box--text']}>
            {description.text}
          </span>
        </div>
      ))}
    </div>
  );
};
