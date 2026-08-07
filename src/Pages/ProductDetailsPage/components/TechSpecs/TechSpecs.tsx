// TechSpecs.tsx
import styles from './TechSpecs.module.scss';
import type { ProductDetails } from '../../../../types/ProductDetails';

interface TechSpecsProps {
  product: ProductDetails;
}

export const TechSpecs = ({ product }: TechSpecsProps) => {
  return (
    <section className={styles.techSpecs}>
      <h3 className={styles.title}>Tech specs</h3>
      <div className={styles.line}></div>
      <div className={styles.blockInfo}>
        <div className={styles.row}>
          <p className={styles.info}>Screen</p>
          <p>{product.screen}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Resolution</p>
          <p>{product.resolution}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>RAM</p>
          <p>{product.ram}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Built in memory</p>
          <p>{product.capacity}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Camera</p>
          <p>{product.camera}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Zoom</p>
          <p>{product.zoom}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.info}>Cell</p>
          <p>{product.cell.join(', ')}</p>
        </div>
      </div>
    </section>
  );
};
