import styles from './ProductSpec.module.scss';
import addSpaces from '../../hooks/addSpaces';

export type Spec = [string, string];

type Props = {
  spec: Spec[];
};

export const ProductSpec: React.FC<Props> = ({ spec }) => (
  <div className={styles.specContainer}>
    <ul className={styles.specs}>
      {spec.map(([label, value]) => (
        <li key={value} className={styles.specItem}>
          <span className={styles.specLabel}>{label}</span>
          <span className={styles.specValue}>{addSpaces(value)}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductSpec;
