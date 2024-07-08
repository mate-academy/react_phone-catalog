import styles from './TechSpecs.module.scss';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  productDetails: ProductDetails;
};

export const TechSpecs: React.FC<Props> = ({ productDetails }) => {
  return (
    <div className={styles.techSpecsContainer}>
      <h3 className={styles.title}>Tech specs</h3>

      <div className={styles.divider}></div>

      <div className={styles.specsAll}>
        <div className={styles.specsWrapper}>
          <p className={styles.specsChar}>Screen</p>
          <p className={styles.specsCharInfo}>{productDetails.screen}</p>
        </div>

        <div className={styles.specsWrapper}>
          <p className={styles.specsChar}>Resolution</p>
          <p className={styles.specsCharInfo}>{productDetails.resolution}</p>
        </div>

        <div className={styles.specsWrapper}>
          <p className={styles.specsChar}>Processor</p>
          <p className={styles.specsCharInfo}>{productDetails.processor}</p>
        </div>

        <div className={styles.specsWrapper}>
          <p className={styles.specsChar}>RAM</p>
          <p className={styles.specsCharInfo}>{productDetails.ram}</p>
        </div>

        <div className={styles.specsWrapper}>
          <p className={styles.specsChar}>Built in memory</p>
          <p className={styles.specsCharInfo}>{productDetails.capacity}</p>
        </div>
      </div>
    </div>
  );
};
