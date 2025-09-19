import { NavLink } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import phones from '/img/category-phones.webp';
import tablets from '/img/category-tablets.png';
import accessories from '/img/category-accessories.webp';

export const ShopByCategory = () => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.categories_title}>Shop by category</h2>

      <div className={styles.categories_wrapper}>
        <div className={styles.category}>
          <NavLink to="./phones" className={styles.categories_photo_container}>
            <img
              src={phones}
              alt="phones"
              className={styles.categories_photo}
            />
          </NavLink>
          <h4>Mobile phones</h4>
          <p>95 models</p>
        </div>

        <div className={styles.category}>
          <NavLink to="./tablets" className={styles.categories_photo_container}>
            <img
              src={tablets}
              alt="tablets"
              className={styles.categories_photo}
            />
          </NavLink>
          <h4>Tablets</h4>
          <p>24 models</p>
        </div>

        <div className={styles.category}>
          <NavLink
            to="./accessories"
            className={styles.categories_photo_container}
          >
            <img
              src={accessories}
              alt="accessories"
              className={styles.categories_photo}
            />
          </NavLink>
          <h4>Accessories</h4>
          <p>100 models</p>
        </div>
      </div>
    </div>
  );
};
