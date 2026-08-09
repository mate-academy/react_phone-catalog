/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';

import styles from './Categories.module.scss';

export const Categories = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>
        Shop by category
      </h2>

      <div className={styles.list}>
        <Link
          to="/phones"
          className={styles.category}
        >
          <img
            src="/img/category-phones.png"
            alt="Mobile phones"
            className={styles.image}
          />

          <h3 className={styles.name}>
            Mobile phones
          </h3>

          <p className={styles.count}>
            95 models
          </p>
        </Link>

        <Link
          to="/tablets"
          className={styles.category}
        >
          <img
            src="/img/category-tablets.png"
            alt="Tablets"
            className={styles.image}
          />

          <h3 className={styles.name}>
            Tablets
          </h3>

          <p className={styles.count}>
            24 models
          </p>
        </Link>

        <Link
          to="/accessories"
          className={styles.category}
        >
          <img
            src="/img/category-accessories.png"
            alt="Accessories"
            className={styles.image}
          />

          <h3 className={styles.name}>
            Accessories
          </h3>

          <p className={styles.count}>
            100 models
          </p>
        </Link>
      </div>
    </section>
  );
};
