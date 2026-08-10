import { Loader } from '../../../../components/Loader';
import { Skeleton } from '../../../../components/Skeleton';
import { useLanguage } from '../../../../context/LanguageContext';
import styles from './ProductDetailsSkeleton.module.scss';

export const ProductDetailsSkeleton = () => {
  const { t } = useLanguage();

  return (
    <div className={`container ${styles.page}`}>
      <Loader compact label={t('common.loadingProductDetails')} />
      <Skeleton className={styles.breadcrumbs} variant="text" />
      <Skeleton className={styles.back} variant="text" />
      <Skeleton className={styles.title} variant="text" />

      <div className={styles.hero}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton className={styles.thumbnail} key={index} />
            ))}
          </div>
          <Skeleton className={styles.mainImage} />
        </div>

        <div className={styles.options}>
          <Skeleton className={styles.optionLabel} variant="text" />
          <div className={styles.swatches}>
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton
                className={styles.swatch}
                variant="circle"
                key={index}
              />
            ))}
          </div>
          <Skeleton className={styles.divider} />
          <Skeleton className={styles.optionLabel} variant="text" />
          <div className={styles.capacities}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <Skeleton className={styles.price} variant="text" />
          <Skeleton className={styles.action} />
        </div>
      </div>

      <div className={styles.information}>
        <div>
          <Skeleton className={styles.heading} variant="text" />
          <Skeleton className={styles.paragraph} variant="text" />
          <Skeleton className={styles.paragraph} variant="text" />
          <Skeleton className={styles.shortParagraph} variant="text" />
        </div>
        <div>
          <Skeleton className={styles.heading} variant="text" />
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton className={styles.spec} variant="text" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
