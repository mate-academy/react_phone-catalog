import styles from './SkeletonProduct.module.scss';

const SkeletonProduct = () => {
  return (
    <section
      className={`${styles.container} ${styles['product-detail-skeleton']}`}
    >
      <div className={styles.goBackButton}>
        {/* Back button skeleton */}
        <div
          className={`${styles.skeletonLoading} skeleton-back-button`}
          style={{ width: '100px', height: '40px' }}
        ></div>
        {/* Text skeleton */}
        <div
          className={`${styles.skeletonLoading} skeleton-text`}
          style={{ width: '60px', height: '20px' }}
        ></div>
      </div>

      {/* Title skeleton */}
      <div
        className={`${styles.title} ${styles.skeletonLoading}`}
        style={{ width: '100%', height: '30px' }}
      ></div>

      <div className={styles.wrap}>
        {/* Image gallery skeleton */}
        <div
          className={`${styles.skeletonLoading} skeleton-image-gallery`}
          style={{ width: '50%', height: '200px' }}
        ></div>
        {/* Product controls skeleton */}
        <div
          className={`${styles.skeletonLoading} skeleton-product-controls`}
          style={{ width: '50%', height: '200px' }}
        ></div>
      </div>

      <div className={styles.block}>
        {/* Description skeleton */}
        <div
          className={`${styles.skeletonLoading} skeleton-description`}
          style={{ width: '100%', height: '100px' }}
        ></div>
        {/* Techspecs skeleton */}
        <div
          className={`${styles.skeletonLoading} skeleton-techspecs`}
          style={{ width: '100%', height: '200px' }}
        ></div>
      </div>
    </section>
  );
};

export default SkeletonProduct;
