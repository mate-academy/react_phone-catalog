import styles from './CategoryCards.module.scss';

export const CategoryCards = () => {
  return (
    <section className={styles.category}>
      <div className={styles.category__container}>
        <h2 className={styles.category__title}>Shop by category</h2>

        <div className={styles.category__cards}>
          <div className={styles.category__card}>
            <picture className={styles.category__picture}>
              <source
                media="(min-width: 1119px)"
                srcSet="src\assets\images\shopCategory\shop-category-phones-desktop.png" // eslint-disable-line
              />
              <source
                media="(min-width: 639px)"
                srcSet="src\assets\images\shopCategory\shop-category-phones-tablet.png" // eslint-disable-line
              />

              <img
                loading="lazy"
                className={`${styles.category__image} ${styles.category__imagePhone}`}
                src="src\assets\images\shopCategory\shop-category-phones-mobile.png" // eslint-disable-line
                alt="Головний слайдер"
              />
            </picture>
            <h3 className={styles.category__cardTitle}>Mobile phones</h3>
            <p className={styles.category__cardDescription}>95 models</p>
          </div>
          <div className={styles.category__card}>
            <picture className={styles.category__picture}>
              <source
                media="(min-width: 1119px)"
                srcSet="src\assets\images\shopCategory\shop-category-tablets-desktop.png" // eslint-disable-line
              />
              <source
                media="(min-width: 639px)"
                srcSet="src\assets\images\shopCategory\shop-category-tablets-tablet.png" // eslint-disable-line
              />

              <img
                loading="lazy"
                className={`${styles.category__image} ${styles.category__imageTablets}`}
                src="src\assets\images\shopCategory\shop-category-tablets-mobile.png" // eslint-disable-line
                alt="Головний слайдер"
              />
            </picture>
            <h3 className={styles.category__cardTitle}>Tablets</h3>
            <p className={styles.category__cardDescription}>24 models</p>
          </div>

          <div className={styles.category__card}>
            <picture className={styles.category__picture}>
              <source
                media="(min-width: 1119px)"
                srcSet="src\assets\images\shopCategory\shop-category-accessories-desktop.png" // eslint-disable-line
              />
              <source
                media="(min-width: 639px)"
                srcSet="src\assets\images\shopCategory\shop-category-accessories-tablet.png" // eslint-disable-line
              />

              <img
                loading="lazy"
                className={`${styles.category__image} ${styles.category__imageAccessories}`}
                src="src\assets\images\shopCategory\shop-category-accessories-mobile.png" // eslint-disable-line
                alt="Головний слайдер"
              />
            </picture>
            <h3 className={styles.category__cardTitle}>Accessories</h3>
            <p className={styles.category__cardDescription}>100 models</p>
          </div>
        </div>
      </div>
    </section>
  );
};
