import styles from './CurrentPage.module.scss';

export const CurrentPage = () => {
  return (
    <div className={styles.productPage__location}>
      <div className={styles.productPage__wrapper}>
        <a href="#" className={styles.productPage__homeLink}>
          <img
            loading="lazy"
            src="src/assets/images/productPage/home-icon.svg"
            alt="Іконка домашньої сторінки"
            className={styles.productPage__homeimg}
          />
        </a>

        <div className={styles.productPage__currentLocation}>
          <img
            src="src/assets/images/productPage/home-arrow.svg"
            alt="Стрілка поточної сторінки"
            loading="lazy"
            className={styles.productPage__arrow}
          />
          <a href="#" className={styles.productPage__currentTitle}>
            Phones
          </a>
        </div>
      </div>
      <h1 className={styles.productPage__productTitle}>Mobile phones</h1>
      <p className={styles.productPage__items}>95 models</p>
    </div>
  );
};
