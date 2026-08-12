import { Skeleton } from '../Skeleton';
import styles from './DetailsSkeleton.module.scss';

export const DetailsSkeleton = () => {
  return (
    <div className={styles.page} aria-label="Loading product details">
      <div className={styles.breadcrumbs}>
        <Skeleton className={styles.breadcrumbIcon} />
        <Skeleton className={styles.breadcrumbLine} />
        <Skeleton className={styles.breadcrumbLineLong} />
      </div>

      <Skeleton className={styles.backLink} />

      <Skeleton className={styles.title} />

      <section className={styles.top}>
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            <Skeleton className={styles.thumb} />
            <Skeleton className={styles.thumb} />
            <Skeleton className={styles.thumb} />
            <Skeleton className={styles.thumb} />
          </div>

          <div className={styles.imageWrapper}>
            <Skeleton className={styles.mainImage} />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.optionBlock}>
            <div className={styles.optionHeader}>
              <Skeleton className={styles.optionTitle} />
              <Skeleton className={styles.productId} />
            </div>

            <div className={styles.colorList}>
              <Skeleton className={styles.colorButton} />
              <Skeleton className={styles.colorButton} />
              <Skeleton className={styles.colorButton} />
              <Skeleton className={styles.colorButton} />
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.optionBlock}>
            <Skeleton className={styles.optionTitle} />

            <div className={styles.capacityList}>
              <Skeleton className={styles.capacityButton} />
              <Skeleton className={styles.capacityButton} />
              <Skeleton className={styles.capacityButton} />
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.price}>
            <Skeleton className={styles.priceDiscount} />
            <Skeleton className={styles.priceRegular} />
          </div>

          <div className={styles.actions}>
            <Skeleton className={styles.cartButton} />
            <Skeleton className={styles.favoriteButton} />
          </div>

          <div className={styles.shortSpecs}>
            <div className={styles.spec}>
              <Skeleton className={styles.specName} />
              <Skeleton className={styles.specValue} />
            </div>

            <div className={styles.spec}>
              <Skeleton className={styles.specName} />
              <Skeleton className={styles.specValue} />
            </div>

            <div className={styles.spec}>
              <Skeleton className={styles.specName} />
              <Skeleton className={styles.specValue} />
            </div>

            <div className={styles.spec}>
              <Skeleton className={styles.specName} />
              <Skeleton className={styles.specValue} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.details}>
        <div className={styles.about}>
          <Skeleton className={styles.sectionTitle} />
          <div className={styles.sectionDivider} />

          <div className={styles.descriptionSection}>
            <Skeleton className={styles.descriptionTitle} />
            <Skeleton className={styles.descriptionText} />
            <Skeleton className={styles.descriptionText} />
            <Skeleton className={styles.descriptionTextShort} />
          </div>

          <div className={styles.descriptionSection}>
            <Skeleton className={styles.descriptionTitle} />
            <Skeleton className={styles.descriptionText} />
            <Skeleton className={styles.descriptionTextShort} />
          </div>
        </div>

        <div className={styles.techSpecs}>
          <Skeleton className={styles.sectionTitle} />
          <div className={styles.sectionDivider} />

          <div className={styles.techList}>
            <div className={styles.techItem}>
              <Skeleton className={styles.techName} />
              <Skeleton className={styles.techValue} />
            </div>

            <div className={styles.techItem}>
              <Skeleton className={styles.techName} />
              <Skeleton className={styles.techValue} />
            </div>

            <div className={styles.techItem}>
              <Skeleton className={styles.techName} />
              <Skeleton className={styles.techValue} />
            </div>

            <div className={styles.techItem}>
              <Skeleton className={styles.techName} />
              <Skeleton className={styles.techValue} />
            </div>

            <div className={styles.techItem}>
              <Skeleton className={styles.techName} />
              <Skeleton className={styles.techValue} />
            </div>

            <div className={styles.techItem}>
              <Skeleton className={styles.techName} />
              <Skeleton className={styles.techValue} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
