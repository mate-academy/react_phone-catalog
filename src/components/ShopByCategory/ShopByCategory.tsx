import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <section className={styles.ShopByCategory}>
      <h2 className={styles.ShopByCategory__title}>Shop by category</h2>

      <div className={styles.ShopByCategory__categories}>
        <article className={styles.ShopByCategory__category}>
          <Link to="/phones">
            <img
              src="public/img/phones-category.png"
              alt="Phones"
              className={styles.ShopByCategory__categoryPhoto}
            />
          </Link>

          <Link to="/phones" className={styles.ShopByCategory__categoryTitle}>
            Mobile phones
          </Link>

          <p className={styles.ShopByCategory__categoryQuantity}>95 models</p>
        </article>

        <article className={styles.ShopByCategory__category}>
          <Link to="/tablets">
            <img
              src="public/img/tablets-category.png"
              alt="Tablets"
              className={styles.ShopByCategory__categoryPhoto}
            />
          </Link>

          <Link to="/tablets" className={styles.ShopByCategory__categoryTitle}>
            Tablets
          </Link>
          <p className={styles.ShopByCategory__categoryQuantity}>24 models</p>
        </article>

        <article className={styles.ShopByCategory__category}>
          <Link to="/accessories">
            <img
              src="public/img/accessories-category.png"
              alt="Accessories"
              className={styles.ShopByCategory__categoryPhoto}
            />
          </Link>

          <Link to="/accessories" className={styles.ShopByCategory__categoryTitle}>
            Accessories
          </Link>

          <p className={styles.ShopByCategory__categoryQuantity}>100 models</p>
        </article>
      </div>
    </section>
  );
};
