import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <section className={styles.category}>
      <h2 className={styles.category__title}>Shop by category</h2>

      <div className={styles.category__grid}>
        <Link to="/phones" className={styles.category__card}>
          <div className={styles.category__photo_wrap}>
            <img
              src="./img/category-phones.png"
              alt="Mobile phones"
              className={styles.category__photo}
            />
          </div>
          <div className={styles.category__info}>
            <h3 className={styles.category__name}>Mobile phones</h3>
            <span className={styles.category__count}>95 models</span>
          </div>
        </Link>

        <Link to="/tablets" className={styles.category__card}>
          <div className={styles.category__photo_wrap}>
            <img
              src="./img/category-tablets.png"
              alt="Tablets"
              className={styles.category__photo}
            />
          </div>
          <div className={styles.category__info}>
            <h3 className={styles.category__name}>Tablets</h3>
            <span className={styles.category__count}>24 models</span>
          </div>
        </Link>

        <Link to="/accessories" className={styles.category__card}>
          <div className={styles.category__photo_wrap}>
            <img
              src="./img/category-accessories.png"
              alt="Accessories"
              className={styles.category__photo}
            />
          </div>
          <div className={styles.category__info}>
            <h3 className={styles.category__name}>Accessories</h3>
            <span className={styles.category__count}>100 models</span>
          </div>
        </Link>
      </div>
    </section>
  );
};
