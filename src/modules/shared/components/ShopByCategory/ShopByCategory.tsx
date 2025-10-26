import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <section className={styles['shop-by-category']}>
      <h2 className={`${styles['shop-by-category__header']} ${styles['section__title']}`}>
        Shop by category
      </h2>
      <div className={styles['shop-by-category__list']}>
        <div className={styles['shop-by-category__item']}>
          <div className={`${styles['shop-by-category__container']} ${styles['shop-by-category__container--color-mobile']}`}>
            <a href="#phones" className={styles['shop-by-category__link']}>
              <img
                src="/img/category-phones.webp"
                alt="Mobile phones"
                className={styles['shop-by-category__item-image']}
              />
            </a>
          </div>
          <div className={styles['shop-by-category__footer']}>
            <div className={styles['shop-by-category__item-title']}>Mobile phones</div>
            <div className={styles['shop-by-category__item-count']}>98 models</div>
          </div>
        </div>

        <div className={styles['shop-by-category__item']}>
          <div className={`${styles['shop-by-category__container']} ${styles['shop-by-category__container--color-tablet']}`}>
            <a href="#tablets" className={styles['shop-by-category__link']}>
              <img
                src="/img/category-tablets.webp"
                alt="Tablets"
                className={styles['shop-by-category__item-image']}
              />
            </a>
          </div>
          <div className={styles['shop-by-category__footer']}>
            <div className={styles['shop-by-category__item-title']}>Tablets</div>
            <div className={styles['shop-by-category__item-count']}>24 models</div>
          </div>
        </div>

        <div className={styles['shop-by-category__item']}>
          <div className={`${styles['shop-by-category__container']} ${styles['shop-by-category__container--color-accessories']}`}>
            <a href="#accessories" className={styles['shop-by-category__link']}>
              <img
                src="/img/category-accessories.webp"
                alt="Accessories"
                className={styles['shop-by-category__item-image']}
              />
            </a>
          </div>
          <div className={styles['shop-by-category__footer']}>
            <div className={styles['shop-by-category__item-title']}>Accessories</div>
            <div className={styles['shop-by-category__item-count']}>100 models</div>
          </div>
        </div>
      </div>
    </section>
  );
};
