import styles from './SkeletonProduct.module.scss';

export const SkeletonProduct = () => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCard__mainImage}></div>
      <p className={styles.productCard__description}></p>
      <h3 className={styles.productCard__price}></h3>

      <span className={styles.productCard__line}></span>
      <div className={styles.productCard__featureWrapper}>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}></p>
          <p className={styles.productCard__featureValue}></p>
        </div>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}></p>
          <p className={styles.productCard__featureValue}></p>
        </div>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}></p>
          <p className={styles.productCard__featureValue}></p>
        </div>
      </div>
      <div className={styles.productCard__buttons}>
        <button className={styles.productCard__addToCart}></button>
        <button className={styles.productCard__addToFavorites}></button>
      </div>
    </div>
  );
};
