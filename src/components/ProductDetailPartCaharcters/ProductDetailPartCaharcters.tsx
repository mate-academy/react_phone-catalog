import { Accessory } from '../../types/AccessorieTypes';
import { Phone } from '../../types/PhoneTypes';
import { Tablet } from '../../types/TabletType';
import styles from '../ProductDetailPartCaharcters/ProductDetailPartCaharctersStyles.module.scss';

type Props = {
  product: Phone | Tablet | Accessory;
};

export const ProductDetailPartCaharcters: React.FC<Props> = ({ product }) => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.characters}>
          Screen <span className={styles.span_caracters}>{product.screen}</span>
        </p>
        <p className={styles.characters}>
          Resolution <span className={styles.span_caracters}>{product.resolution}</span>
        </p>
        <p className={styles.characters}>
          Processor <span className={styles.span_caracters}>{product.processor}</span>
        </p>
        <p className={styles.characters}>
          RAM <span className={styles.span_caracters}>{product.ram}</span>
        </p>
      </div>
    </>
  );
};
