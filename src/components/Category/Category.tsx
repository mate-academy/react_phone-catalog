import { NavLink } from 'react-router-dom';
import styles from './Category.module.scss';

export const Category = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.content}>
        <div className={styles.category}>
          <div className={styles.photoContainer}>
            <img
              src="img/category-phones.webp"
              alt="categoryPhones"
              className={styles.img}
            />
          </div>
          <NavLink to="/phones" className={styles.categoryName}>
            Mobile phones
          </NavLink>
          <h4 className={styles.quantity}>95 models</h4>
        </div>
        <div className={styles.category}>
          <div className={styles.photoContainerTablets}>
            <img
              src="img/category-tablets.webp"
              alt="categoryTablets"
              className={styles.img}
            />
          </div>
          <NavLink to="/tablets" className={styles.categoryName}>
            Tablets
          </NavLink>
          <h4 className={styles.quantity}>24 models</h4>
        </div>
        <div className={styles.categoryAccessories}>
          <div className={styles.photoContainerAccessories}>
            <img
              src="img/category-accessories.webp"
              alt="categoryAccessories"
              className={styles.img}
            />
          </div>
          <NavLink to="/accessories" className={styles.categoryName}>
            Accessories
          </NavLink>
          <h4 className={styles.quantity}>100 models</h4>
        </div>
      </div>
    </div>
  );
};
