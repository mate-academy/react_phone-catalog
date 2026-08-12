import { useTranslation } from '../../../../hooks';
import type { ProductDetailsFromServer } from '../../../../types/product';
import styles from '../../ProductDetailsPage.module.scss';

type Props = {
  product: ProductDetailsFromServer;
};

export const ProductTechSpecs = ({ product }: Props) => {
  const t = useTranslation();

  return (
    <div className={styles.techSpecs}>
      <h2 className={styles.sectionTitle}>{t.productDetails.techSpecs}</h2>

      <div className={styles.sectionDivider} />

      <dl className={styles.techList}>
        <div className={styles.techItem}>
          <dt className={styles.techName}>{t.productDetails.screen}</dt>
          <dd className={styles.techValue}>{product.screen}</dd>
        </div>

        <div className={styles.techItem}>
          <dt className={styles.techName}>{t.productDetails.resolution}</dt>
          <dd className={styles.techValue}>{product.resolution}</dd>
        </div>

        <div className={styles.techItem}>
          <dt className={styles.techName}>{t.productDetails.processor}</dt>
          <dd className={styles.techValue}>{product.processor}</dd>
        </div>

        <div className={styles.techItem}>
          <dt className={styles.techName}>{t.productDetails.ram}</dt>
          <dd className={styles.techValue}>{product.ram}</dd>
        </div>

        <div className={styles.techItem}>
          <dt className={styles.techName}>{t.productDetails.builtInMemory}</dt>
          <dd className={styles.techValue}>{product.capacity}</dd>
        </div>

        {product.camera && (
          <div className={styles.techItem}>
            <dt className={styles.techName}>{t.productDetails.camera}</dt>
            <dd className={styles.techValue}>{product.camera}</dd>
          </div>
        )}

        {product.zoom && (
          <div className={styles.techItem}>
            <dt className={styles.techName}>{t.productDetails.zoom}</dt>
            <dd className={styles.techValue}>{product.zoom}</dd>
          </div>
        )}

        <div className={styles.techItem}>
          <dt className={styles.techName}>{t.productDetails.cell}</dt>
          <dd className={styles.techValue}>{product.cell.join(', ')}</dd>
        </div>
      </dl>
    </div>
  );
};
