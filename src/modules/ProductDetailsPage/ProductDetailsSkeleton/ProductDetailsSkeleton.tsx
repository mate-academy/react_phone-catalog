import styles from './ProductDetailsSkeleton.module.scss';

export const ProductDetailsSkeleton = () => (
  <div className={styles.skeleton__Container}>
    <div className={styles.skeleton__Title} />
    <div className={styles.skeleton__Header}>
      <div className={styles.skeleton__ImageBlock} />
      <div className={styles.skeleton__FormBlock}>
        <div className={styles.skeleton__FormLine} />
        <div className={styles.skeleton__FormLine} />
        <div className={styles.skeleton__FormLine} />
      </div>
    </div>
    <div className={styles.skeleton__Body}>
      <div className={styles.skeleton__About}>
        <div className={styles.skeleton__AboutLine} />
        <div className={styles.skeleton__AboutLine} />
        <div className={styles.skeleton__AboutLine} />
        <div className={styles.skeleton__AboutLine} />
      </div>
      <div className={styles.skeleton__Specs}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={styles.skeleton__SpecRow} />
        ))}
      </div>
    </div>
  </div>
);
