import { Accessory } from '../../types/AccessorieTypes';
import { Phone } from '../../types/PhoneTypes';
import { Tablet } from '../../types/TabletType';
import styles from '../TechSpecs/TechSpecsStyles.module.scss';

type Props = {
  product: Phone | Tablet | Accessory;
};

export const TechProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.container}>
      {product.screen && (
        <p className={styles.characters}>
          Screen <span className={styles.span_caracters}>{product.screen}</span>
        </p>
      )}

      {product.resolution && (
        <p className={styles.characters}>
          Resolution <span className={styles.span_caracters}>{product.resolution}</span>
        </p>
      )}

      {product.processor && (
        <p className={styles.characters}>
          Processor <span className={styles.span_caracters}>{product.processor}</span>
        </p>
      )}

      {product.ram && (
        <p className={styles.characters}>
          RAM <span className={styles.span_caracters}>{product.ram}</span>
        </p>
      )}

      {product.capacity && (
        <p className={styles.characters}>
          Built in memory <span className={styles.span_caracters}>{product.capacity}</span>
        </p>
      )}

      {product.camera && (
        <p className={styles.characters}>
          Camera <span className={styles.span_caracters}>{product.camera}</span>
        </p>
      )}

      {product.zoom && (
        <p className={styles.characters}>
          Zoom <span className={styles.span_caracters}>{product.zoom}</span>
        </p>
      )}

      {product.cell && product.cell.length > 0 && (
        <p className={styles.characters}>
          Cell <span className={styles.span_caracters}>{product.cell.join(', ')}</span>
        </p>
      )}
    </div>
  );
};
