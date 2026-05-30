import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <div className={`${styles.shopByCategory} ${styles.section}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Shop by category</h2>
        <div className={styles.category}>
          <div className={styles.card}>
            <img src="/img/Phones.png" alt="Phones" className={styles.image} />
            <div className={styles.info}>
              <span className={styles.categoryName}>Mobile phones</span>
              <p className={styles.countOfModels}>95 models</p>
            </div>
          </div>
          <div className={styles.card}>
            <img
              src="/img/tablets.png"
              alt="Tablets"
              className={styles.image}
            />
            <div className={styles.info}>
              <span className={styles.categoryName}>Tablets</span>
              <p className={styles.countOfModels}>24 models</p>
            </div>
          </div>
          <div className={styles.card}>
            <img
              src="/img/Accessories.png"
              alt="Accessories"
              className={styles.image}
            />
            <div className={styles.info}>
              <span className={styles.categoryName}>Accessories</span>
              <p className={styles.countOfModels}>100 models</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
