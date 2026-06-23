import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';

export const Categories = () => {
  return (
    <div className={styles.section__wrapper}>
      <div className={styles.section__header}>
        <h2 className={styles.section__title}>Shop by Category</h2>
      </div>

      <div className={styles.category}>
        <div className={styles.category__item}>
          <Link to="/phones" className={styles.category__link}>
            <img
              src="img/category-phones.png"
              alt="Phones"
              className={styles.category__image}
            />

            <div className={styles.category__header}>
              <h3 className={styles.category__title}>Mobile phones</h3>
              <p className={styles.category__count}>95 models</p>
            </div>
          </Link>
        </div>

        <div className={styles.category__item}>
          <Link to="/tablets" className={styles.category__link}>
            <img
              src="img/category-tablets.png"
              alt="Tablets"
              className={styles.category__image}
            />

            <div className={styles.category__header}>
              <h3 className={styles.category__title}>Tablets</h3>
              <p className={styles.category__count}>24 models</p>
            </div>
          </Link>
        </div>

        <div className={styles.category__item}>
          <Link to="/accessories" className={styles.category__link}>
            <img
              src="img/category-accessories.png"
              alt="Accessories"
              className={styles.category__image}
            />

            <div className={styles.category__header}>
              <h3 className={styles.category__title}>Accessories</h3>
              <p className={styles.category__count}>100 models</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
