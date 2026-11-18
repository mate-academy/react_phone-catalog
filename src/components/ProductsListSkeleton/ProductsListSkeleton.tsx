import styles from './ProductsListSkeleton.module.scss';

type Props = {
  count?: number;
};

export const ProductsListSkeleton = ({ count = 8 }: Props) => {
  return (
    <div className={styles.grid} role="status" aria-label="Loading products">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={styles.card} aria-hidden="true">
          <div className={`${styles.placeholder} ${styles.image}`} />

          <div className={styles.name}>
            <div className={styles.placeholder} />
            <div className={`${styles.placeholder} ${styles.nameShort}`} />
          </div>

          <div className={`${styles.placeholder} ${styles.price}`} />

          <div className={styles.specs}>
            {[0, 1, 2, 3].map(specIndex => (
              <div
                key={specIndex}
                className={`${styles.placeholder} ${styles.spec}`}
              />
            ))}
          </div>

          <div className={styles.actions}>
            <div className={`${styles.placeholder} ${styles.button}`} />
            <div className={`${styles.placeholder} ${styles.heart}`} />
          </div>
        </div>
      ))}
    </div>
  );
};
