import styles from './CategoriesBlock.module.scss';

export const CategoriesBlock = () => {
  return (
    <section className={`${styles.categories} blocksIdentation container`}>
      <h2 className={styles.categories__title}>Shop by category</h2>

      <div className={styles.categories__container}>
        <a href="" className={styles.category}>
          <div
            className={`${styles.category__img} ${styles.category__imgPhones}`}
          ></div>

          <div className={styles.category__description}>
            <h4>Mobile phones</h4>

            <p>95 models</p>
          </div>
        </a>

        <div className={styles.category}>
          <div
            className={`${styles.category__img} ${styles.category__imgTablets}`}
          ></div>

          <div className={styles.category__description}>
            <h4>Tablets</h4>

            <p>24 models</p>
          </div>
        </div>

        <div className={styles.category}>
          <div
            className={`${styles.category__img} ${styles.category__imgAccessories}`}
          ></div>

          <div className={styles.category__description}>
            <h4>Accessories</h4>

            <p>100 models</p>
          </div>
        </div>
      </div>
    </section>
  );
};
