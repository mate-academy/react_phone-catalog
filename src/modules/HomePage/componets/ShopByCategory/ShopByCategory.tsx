import { NavLink } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import phones from '/img/category-phones.webp';
import tablets from '/img/category-tablets.png';
import accessories from '/img/category-accessories.png';

export const ShopByCategory = () => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.categories_title}>Shop by category</h2>

      <div className={styles.categories_wrapper}>
        <div className={styles.category}>
          <NavLink
            to="./phones"
            className={styles.categories_photo_container_1}
          >
            <img
              src={phones}
              alt="phones"
              className={styles.categories_photo}
            />
          </NavLink>
          <div className={styles.category_description}>
            <h4 className={styles.category_title}>Mobile phones</h4>
            <p className={styles.category_amount}>95 models</p>
          </div>
        </div>

        <div className={styles.category}>
          <NavLink
            to="./tablets"
            className={styles.categories_photo_container_2}
          >
            <img
              src={tablets}
              alt="tablets"
              className={styles.categories_photo}
            />
          </NavLink>
          <div className={styles.category_description}>
            <h4 className={styles.category_title}>Tablets</h4>
            <p className={styles.category_amount}>24 models</p>
          </div>
        </div>

        <div className={styles.category}>
          <NavLink
            to="./accessories"
            className={styles.categories_photo_container_3}
          >
            <img
              src={accessories}
              alt="accessories"
              className={styles.categories_photo}
            />
          </NavLink>
          <div className={styles.category_description}>
            <h4 className={styles.category_title}>Accessories</h4>
            <p className={styles.category_amount}>100 models</p>
          </div>
        </div>
      </div>
    </div>
  );
};
