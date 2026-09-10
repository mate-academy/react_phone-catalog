import { ProductSpec } from '@/types/ProductSpec';
import styles from './ProductSpecs.module.scss';
import classNames from 'classnames';

interface Props {
  specs: ProductSpec[];
  textSize?: 's' | 'm';
}

export const ProductSpecs = ({ specs, textSize = 's' }: Props) => {
  return (
    <div className={styles.productSpecs}>
      {specs.map(spec => (
        <div
          key={spec.name}
          className={classNames(styles.spec, styles[textSize])}
        >
          <span className={styles.specTitle}>{spec.name}</span>
          <span className={styles.specValue}>{spec.value}</span>
        </div>
      ))}
    </div>
  );
};
