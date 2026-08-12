import { useTranslation } from '../../../../hooks';
import type { ProductDetailsFromServer } from '../../../../types/product';
import styles from '../../ProductDetailsPage.module.scss';

type Props = {
  product: ProductDetailsFromServer;
};

export const ProductShortSpecs = ({ product }: Props) => {
  const t = useTranslation();

  return (
    <dl className={styles.shortSpecs}>
      <div className={styles.spec}>
        <dt className={styles.specName}>{t.productDetails.screen}</dt>
        <dd className={styles.specValue}>{product.screen}</dd>
      </div>

      <div className={styles.spec}>
        <dt className={styles.specName}>{t.productDetails.resolution}</dt>
        <dd className={styles.specValue}>{product.resolution}</dd>
      </div>

      <div className={styles.spec}>
        <dt className={styles.specName}>{t.productDetails.processor}</dt>
        <dd className={styles.specValue}>{product.processor}</dd>
      </div>

      <div className={styles.spec}>
        <dt className={styles.specName}>{t.productDetails.ram}</dt>
        <dd className={styles.specValue}>{product.ram}</dd>
      </div>
    </dl>
  );
};
