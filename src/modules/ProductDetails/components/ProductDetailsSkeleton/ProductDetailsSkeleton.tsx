import styles from './ProductDetailsSkeleton.module.scss';

import { Skeleton } from '../../../../components/Skeleton';

export const ProductDetailsSkeleton = () => {
  return (
    <div className={styles.containerProductDetailsPage}>
      <div className={styles.productPageHero}>
        <section className={styles.imagesBlock}>
          <Skeleton />
        </section>

        <section className={styles.selectionBlock}>
          <Skeleton />
        </section>
      </div>

      <div className={styles.description}>
        <div className={styles.about}>
          <Skeleton />
        </div>
        <div className={`${styles.skeleton} ${styles.techSpecs}`}>
          <Skeleton />
        </div>
      </div>

      <div className={styles.alsoLike}>
        <Skeleton />
      </div>
    </div>
  );
};
