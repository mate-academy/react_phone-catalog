import { ProductDetail } from '../../types/ProductDetail';
import { normalizeString } from '../../utils/utils';

import styles from './TechSpecsProduct.module.scss';

type Props = {
  productDetail: ProductDetail | null;
};

export const TechSpecsProduct: React.FC<Props> = ({ productDetail }) => {
  const normalizeRam = normalizeString(productDetail?.ram || '');
  const normalizeCapacity = normalizeString(productDetail?.capacity || '');

  const activeProductCardText = `${styles.TechSpecsText} ${styles.TechSpecsTextActive}`;

  return (
    <article className={styles.TechSpecs}>
      <p className={styles.TechSpecsTitle}>Tech specs</p>
      <div className={styles.TechSpecsInner}>
        <div className={styles.TechSpecsDescriptions}>
          <p className={styles.TechSpecsText}>Screen</p>
          <p className={styles.TechSpecsText}>Resolution</p>
          <p className={styles.TechSpecsText}>Processor</p>
          <p className={styles.TechSpecsText}>RAM</p>
          <p className={styles.TechSpecsText}>Built in memory</p>
          <p className={styles.TechSpecsText}>Camera</p>
          <p className={styles.TechSpecsText}>Zoom</p>
          <p className={styles.TechSpecsText}>Cell</p>
        </div>
        <div className={styles.TechSpecsDescriptions}>
          <p className={activeProductCardText}>{productDetail?.screen}</p>
          <p className={activeProductCardText}>{productDetail?.resolution}</p>
          <p className={activeProductCardText}>{productDetail?.processor}</p>
          <p className={activeProductCardText}>{normalizeRam}</p>
          <p className={activeProductCardText}>{normalizeCapacity}</p>
          <p className={activeProductCardText}>{productDetail?.camera}</p>
          <p className={activeProductCardText}>{productDetail?.zoom}</p>
          <p className={activeProductCardText}>{productDetail?.cell}</p>
        </div>
      </div>
    </article>
  );
};
