import { Skeleton } from '@/modules/shared/components/Skeleton';

import styles from './ContentSkeleton.module.scss';
import classNames from 'classnames';
import { ProductsSlider } from '@/modules/shared/components/ProductsSlider';
import { CiImageOn } from 'react-icons/ci';

const GALLERY_SLIDES_COUNT = 4;
const SHORT_SPECS_COUNT = 4;
const FULL_SPECS_COUNT = 8;

export const ContentSkeleton = () => {
  return (
    <>
      <Skeleton className={styles.title} />

      <section className={styles.hero}>
        <div className={styles.gallerySlider}>
          <Skeleton className={styles.galleryActiveSlide}>
            <CiImageOn size={120} />
          </Skeleton>

          <div className={styles.gallerySlides}>
            {Array.from({ length: GALLERY_SLIDES_COUNT }).map((_, i) => (
              <Skeleton
                key={`gallery-slide-${i + 1}`}
                className={styles.gallerySlide}
              >
                <CiImageOn size={24} />
              </Skeleton>
            ))}
          </div>
        </div>

        <div className={styles.mainInfo}>
          <Skeleton className={styles.colors} />
          <Skeleton className={styles.splitLine} />
          <Skeleton className={styles.capacity} />
          <Skeleton className={styles.splitLine} />
          <div className={styles.prices}>
            <Skeleton className={styles.curPrice} />
            <Skeleton className={styles.oldPrice} />
          </div>

          <div className={styles.mainActions}>
            <Skeleton className={styles.cartBtn} />
            <Skeleton className={styles.likeBtn} />
          </div>

          <div className={classNames(styles.specs, styles.shortSpecs)}>
            {Array.from({ length: SHORT_SPECS_COUNT }).map((_, shortSpecI) => (
              <Skeleton
                key={`short-spec-${shortSpecI}`}
                className={styles.spec}
              />
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <section
          className={classNames(styles.contentSection, styles.aboutWrapper)}
        >
          <h2 className={styles.subtitle}>About</h2>
          <Skeleton className={styles.about} />
        </section>

        <section
          className={classNames(styles.contentSection, styles.specsWrapper)}
        >
          <h2 className={styles.subtitle}>Tech specs</h2>
          <div className={classNames(styles.specs, styles.fullSpecs)}>
            {Array.from({ length: FULL_SPECS_COUNT }).map((_, specI) => (
              <Skeleton key={`spec-${specI}`} className={styles.spec} />
            ))}
          </div>
        </section>
      </div>

      <section className={styles.contentSection}>
        <ProductsSlider products={[]} title="You may also like" isLoading />
      </section>
    </>
  );
};
