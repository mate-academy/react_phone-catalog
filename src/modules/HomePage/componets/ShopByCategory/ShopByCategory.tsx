import { NavLink } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import phones from '/img/category-phones.webp';
import tablets from '/img/category-tablets.png';
import accessories from '/img/category-accessories.png';
import { useProducts } from '../../../shared/hooks/useProducts';

export const ShopByCategory = () => {
  const { categoryCounts } = useProducts('phones');

  return (
    <div className={styles.categories}>
      <h2 className={styles.categories_title}>Shop by category</h2>

      <div className={styles.categories_wrapper}>
        <NavLink to="./phones" className={styles.category}>
          <div className={styles.categories_photo_container_1}>
            <img
              src={phones}
              alt="phones"
              className={styles.categories_photo}
            />
          </div>
          <div className={styles.category_description}>
            <h4 className={styles.category_title}>Mobile phones</h4>
            <p
              className={styles.category_amount}
            >{`${categoryCounts.phones} models`}</p>
          </div>
        </NavLink>

        <NavLink to="./tablets" className={styles.category}>
          <div className={styles.categories_photo_container_2}>
            <img
              src={tablets}
              alt="tablets"
              className={styles.categories_photo}
            />
          </div>
          <div className={styles.category_description}>
            <h4 className={styles.category_title}>Tablets</h4>
            <p
              className={styles.category_amount}
            >{`${categoryCounts.tablets} models`}</p>
          </div>
        </NavLink>

        <NavLink to="./accessories" className={styles.category}>
          <div className={styles.categories_photo_container_3}>
            <img
              src={accessories}
              alt="accessories"
              className={styles.categories_photo}
            />
          </div>
          <div className={styles.category_description}>
            <h4 className={styles.category_title}>Accessories</h4>
            <p
              className={styles.category_amount}
            >{`${categoryCounts.accessories} models`}</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
