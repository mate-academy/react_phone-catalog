import { ProductDetail } from '../../types/ProductDetail';
import { extractNumberAndSuffix } from '../../utils';

import cn from 'classnames';
import styles from './TechSpecsProduct.module.scss';

type Props = {
  productDetail: ProductDetail | null;
};

export const TechSpecsProduct: React.FC<Props> = ({ productDetail }) => {
  const normalizeRam = extractNumberAndSuffix(productDetail?.ram || '');
  const normalizeCapacity = extractNumberAndSuffix(
    productDetail?.capacity || '',
  );

  return (
    <article className={styles.techSpecs}>
      <p className={styles.title}>Tech specs</p>
      <div className={styles.inner}>
        <div className={styles.descriptions}>
          <p className={styles.description}>Screen</p>
          <p className={styles.description}>Resolution</p>
          <p className={styles.description}>Processor</p>
          <p className={styles.description}>RAM</p>
          <p className={styles.description}>Built in memory</p>
          <p className={styles.description}>Camera</p>
          <p className={styles.description}>Zoom</p>
          <p className={styles.description}>Cell</p>
        </div>
        <div className={styles.descriptions}>
          <p className={cn(styles.description, styles['description--active'])}>
            {productDetail?.screen}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {productDetail?.resolution}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {productDetail?.processor}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {normalizeRam}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {normalizeCapacity}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {productDetail?.camera}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {productDetail?.zoom}
          </p>
          <p className={cn(styles.description, styles['description--active'])}>
            {productDetail?.cell.join(', ')}
          </p>
        </div>
      </div>
    </article>
  );
};
