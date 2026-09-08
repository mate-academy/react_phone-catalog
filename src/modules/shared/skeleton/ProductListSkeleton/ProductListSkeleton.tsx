import styles from './ProductListSkeleton.module.scss';

export const ProductListSkeleton = () => (
  <>
    <div className={styles.container}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className={styles.col}>
          <div className={styles['movie--isloading']}>
            <div className={styles['loading-image']}></div>
            <div className={styles['loading-content']}>
              <div className={styles['loading-text-container']}>
                <div className={styles['loading-main-text']}></div>
                <div className={styles['loading-sub-text']}></div>
              </div>
              <div className={styles['loading-btn']}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className={styles.pagination}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className={styles.avatar}></div>
      ))}
    </div>
  </>
);

export default ProductListSkeleton;
