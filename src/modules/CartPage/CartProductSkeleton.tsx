import styles from './CartProduct.module.scss';

export const CartProductSkeleton: React.FC = () => {
  return (
    <div className={`${styles.product} ${styles.isLoading}`}>
      <div className={styles.details}>
        <div
          className={`
            ${styles.img} 
            ${styles.close}
          `}
        ></div>
        <div className={styles.wrapper}>
          <div className={styles.image}></div>
        </div>

        <div className={styles.name}></div>
      </div>

      <div className={styles.price}>
        <div className={styles.counter}>
          <div className={styles.value}></div>
        </div>
        <div className={styles.priceTitle}></div>
      </div>
    </div>
  );
};
