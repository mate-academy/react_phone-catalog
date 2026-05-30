import { ProductDetails } from '../../types/ProductDetails';
import styles from './TechSpecs.module.scss';

type Props = {
  product: ProductDetails;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.techpecs}>
      <h3 className={styles.techpecs__header}>Tech specs</h3>
      <div className={styles.techpecs__detailes}>
        <div className={styles.techpecs__detailesRow}>
          <span className={styles.techpecs__detailesName}>Screen</span>
          <span className={styles.techpecs__detailesValue}>
            {product.screen}
          </span>
        </div>
        <div className={styles.techpecs__detailesRow}>
          <span className={styles.techpecs__detailesName}>Resolution</span>
          <span className={styles.techpecs__detailesValue}>
            {product.resolution}
          </span>
        </div>
        <div className={styles.techpecs__detailesRow}>
          <span className={styles.techpecs__detailesName}>Processor</span>
          <span className={styles.techpecs__detailesValue}>
            {product.processor}
          </span>
        </div>
        <div className={styles.techpecs__detailesRow}>
          <span className={styles.techpecs__detailesName}>RAM</span>
          <span className={styles.techpecs__detailesValue}>
            {product.ram.replace('GB', ' GB')}
          </span>
        </div>
        <div className={styles.techpecs__detailesRow}>
          <span className={styles.techpecs__detailesName}>
            {product.category === 'accessories'
              ? 'Screen size'
              : 'Built in memory'}
          </span>
          <span className={styles.techpecs__detailesValue}>
            {product.capacity.replace('GB', ' GB')}
          </span>
        </div>
        <div className={styles.techpecs__detailesRow}>
          <span className={styles.techpecs__detailesName}>Camera</span>
          <span className={styles.techpecs__detailesValue}>
            {product.camera || 'none'}
          </span>
        </div>
        <div className={styles.techpecs__detailesRow}>
          <span className={styles.techpecs__detailesName}>Zoom</span>
          <span className={styles.techpecs__detailesValue}>
            {product.zoom || 'none'}
          </span>
        </div>
        <div className={styles.techpecs__detailesRow}>
          <span className={styles.techpecs__detailesName}>Cell</span>
          <span className={styles.techpecs__detailesValue}>
            {product.cell.join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};
