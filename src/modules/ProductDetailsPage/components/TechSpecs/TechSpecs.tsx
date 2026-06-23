import { ProductDetails } from '../../../shared/types/catalog';
import styles from './TechSpecs.module.scss';

interface Props {
  product: ProductDetails;
}

export const TechSpecs = ({ product }: Props) => (
  <dl className={styles.specs}>
    <div className={styles.row}>
      <dt>Screen</dt>
      <dd>{product.screen}</dd>
    </div>
    <div className={styles.row}>
      <dt>Resolution</dt>
      <dd>{product.resolution}</dd>
    </div>
    <div className={styles.row}>
      <dt>Processor</dt>
      <dd>{product.processor}</dd>
    </div>
    <div className={styles.row}>
      <dt>RAM</dt>
      <dd>{product.ram}</dd>
    </div>
    <div className={styles.row}>
      <dt>Camera</dt>
      <dd>{product.camera ?? 'Not specified'}</dd>
    </div>
    <div className={styles.row}>
      <dt>Cell</dt>
      <dd>{product.cell.join(', ')}</dd>
    </div>
  </dl>
);
