import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <section className={styles.shopByCategory}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.categoriesList}>
        <div className={styles.categoryCard}>
          <a href="" className={styles.shopLink}>
            <picture>
              <source
                media="(min-width: 1200px)"
                srcSet="/img/icon/phones-desk.png"
              />
              <source
                media="(min-width: 640px)"
                srcSet="/img/icon/phones-tablet.png"
              />
              <img src="/img/icon/phones.png" alt="" className={styles.image} />
            </picture>
          </a>

          <h3 className={styles.name}>Mobile phones</h3>
          <p className={styles.modelsCount}>95 models</p>
        </div>

        <div className={styles.categoryCard}>
          <a href="" className={styles.shopLink}>
            <picture>
              <source
                media="(min-width: 1200px)"
                srcSet="/img/icon/tablets-desk.png"
              />
              <source
                media="(min-width: 640px)"
                srcSet="/img/icon/tablets-tablet.png"
              />
              <img
                src="/img/icon/tablets.png"
                alt=""
                className={styles.image}
              />
            </picture>
          </a>

          <h3 className={styles.name}>Tablets</h3>
          <p className={styles.modelsCount}>24 models</p>
        </div>

        <div className={styles.categoryCard}>
          <a href="" className={styles.shopLink}>
            <picture>
              <source
                media="(min-width: 1200px)"
                srcSet="/img/icon/accessories-desk.png"
              />
              <source
                media="(min-width: 640px)"
                srcSet="/img/icon/accessories-tablet.png"
              />
              <img
                src="/img/icon/accessories.png"
                alt=""
                className={styles.image}
              />
            </picture>
          </a>

          <h3 className={styles.name}>Accessories</h3>
          <p className={styles.modelsCount}>100 models</p>
        </div>
      </div>
    </section>
  );
};
