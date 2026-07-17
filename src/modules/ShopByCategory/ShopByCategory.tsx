import { Link } from 'react-router-dom';
import styles from './ShopByCategory.styles.module.scss';

import phoneImg from '../../assets/shopbycategory/phones.png';
import tabletImg from '../../assets/shopbycategory/tablet.png';
import accessoriesImg from '../../assets/shopbycategory/accessories.png';

export const ShopByCategory = () => {
  return (
    <section className={styles.section}>
      <h2>Shop by category</h2>

      <div className={styles.categories}>
        <Link to="/phones" className={styles.category}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={phoneImg} alt="Mobile phones" />
          </div>

          <div className={styles.info}>
            <h3 className={styles.categoryTitle}>Mobile phones</h3>
            <p className={styles.models}>95 models</p>
          </div>
        </Link>

        <Link to="/tablets" className={styles.category}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={tabletImg} alt="Tablets" />
          </div>

          <div className={styles.info}>
            <h3 className={styles.categoryTitle}>Tablets</h3>
            <p className={styles.models}>24 models</p>
          </div>
        </Link>

        <Link to="/accessories" className={styles.category}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={accessoriesImg}
              alt="accessories"
            />
          </div>

          <div className={styles.info}>
            <h3 className={styles.categoryTitle}>Accessories</h3>
            <p className={styles.models}>100 models</p>
          </div>
        </Link>
      </div>
    </section>
  );
};
