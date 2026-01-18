import { Link } from 'react-router-dom';
import styles from './CategoriesBlock.module.scss';

export const CategoriesBlock = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.content}>
        {/* Phones */}
        <article className={styles.category}>
          <Link to="/phones" className={styles.pictureLink}>
            <img
              src="img/category-phones.png"
              alt="phones-category"
              className={styles.picture}
            />
          </Link>

          <Link to="/phones" className={styles.categoryTitle}>
            Mobile phones
          </Link>

          <p className={styles.description}>95 models</p>
        </article>

        {/* Tablets */}
        <article className={styles.category}>
          <Link to="/tablets" className={styles.pictureLink}>
            <img
              src="img/category-tablets (1).png"
              alt="tablets-category"
              className={styles.picture}
            />
          </Link>

          <Link to="/tablets" className={styles.categoryTitle}>
            Tablets
          </Link>

          <p className={styles.description}>24 models</p>
        </article>

        {/* Accessories */}
        <article className={styles.category}>
          <Link to="/accessories" className={styles.pictureLink}>
            <img
              src="img/category-accessories (1).png"
              alt="accessories-category"
              className={styles.picture}
            />
          </Link>

          <Link to="/accessories" className={styles.categoryTitle}>
            Accessories
          </Link>

          <p className={styles.description}>100 models</p>
        </article>
      </div>
    </section>
  );
};
