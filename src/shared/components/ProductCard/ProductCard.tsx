import styles from './ProductCard.module.scss';

export const ProductCard = () => {
  return (
    <div className={styles.productCard}>
      <img
        loading="lazy"
        className={styles.productCard__mainImage}
        src="src/assets/images/productsSlider/products-phone.png"
        alt=""
      />
      <p className={styles.productCard__description}>
        Apple iPhone 14 Pro 128GB Silver (MQ023)
      </p>
      <p className={styles.productCard__price}>$999</p>
      <span className={styles.productCard__line}></span>
      <div className={styles.productCard__featureWrapper}>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>Screen</p>
          <p className={styles.productCard__featureValue}>6.1” OLED</p>
        </div>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>Capacity</p>
          <p className={styles.productCard__featureValue}>128 GB</p>
        </div>
        <div className={styles.productCard__feature}>
          <p className={styles.productCard__featureTitle}>RAM</p>
          <p className={styles.productCard__featureValue}>6 GB</p>
        </div>
      </div>
      <div className={styles.productCard__buttons}>
        <button className={styles.productCard__add}>Add to cart</button>
        <button className={styles.productCard__favorites}>
          <img
            loading="lazy"
            src="src/assets/images/productsSlider/favorites-icon.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};
