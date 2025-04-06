import { Accessories } from '../../types/Accessories';
import { Phones } from '../../types/Phones';
import { Tablets } from '../../types/Tablets';
import styles from './TechSpecs.module.scss';

type ProductType = Phones | Tablets | Accessories;

interface TechSpecsProps {
  product: ProductType;
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ product }) => {
  return (
    <div className={styles.techSpecs}>
      <h3 className={styles.techSpecs_title}>Tech Specs</h3>
      <div className={styles.techSpecs_block}>
        <p className={styles.techSpecs_name}>
          Screen
          <span className={styles.techSpecs_value}>{product.screen}</span>
        </p>
        <p className={styles.techSpecs_name}>
          Resolution
          <span className={styles.techSpecs_value}>{product.resolution}</span>
        </p>
        <p className={styles.techSpecs_name}>
          Processor
          <span className={styles.techSpecs_value}>{product.processor}</span>
        </p>
        <p className={styles.techSpecs_name}>
          RAM
          <span className={styles.techSpecs_value}>{product.ram}</span>
        </p>
        <p className={styles.techSpecs_name}>
          Built in memory
          <span className={styles.techSpecs_value}>{product.capacity}</span>
        </p>
        {'camera' in product && product.camera && (
          <p className={styles.techSpecs_name}>
            Camera
            <span className={styles.techSpecs_value}>{product.camera}</span>
          </p>
        )}
        {'camera' in product && product.zoom && (
          <p className={styles.techSpecs_name}>
            Zoom
            <span className={styles.techSpecs_value}>{product.zoom}</span>
          </p>
        )}
        <p className={styles.techSpecs_name}>
          Cell
          <span className={styles.techSpecs_value}>
            {product.cell.slice(0, 3).join(', ')}
          </span>
        </p>
      </div>
    </div>
  );
};
