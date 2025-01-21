import styles from './Categories.module.scss';

export const Categories = () => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <div className={styles.categories__section}>
        <div className={styles.categories__phones}>
          <img
            className={styles.categories__image}
            src="img/phones-category.png"
            alt="phones category"
          />
          <h4 className={styles.categories__name}>Mobile Phones</h4>
          <p className={styles.categories__description}>100 models</p>
        </div>

        <div className={styles.categories__tablets}>
          <img
            className={styles.categories__image}
            src="img/tablets-category.png"
            alt="tablets category"
          />
          <h4 className={styles.categories__name}>Tablets</h4>
          <p className={styles.categories__description}>50 models</p>
        </div>

        <div className={styles.categories__accessories}>
          <img
            className={styles.categories__image}
            src="img/accessories-category.png"
            alt="accessories category"
          />
          <h4 className={styles.categories__name}>Accessories</h4>
          <p className={styles.categories__description}>10 models</p>
        </div>
      </div>
    </div>
  );
};
