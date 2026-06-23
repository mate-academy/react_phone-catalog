import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

export const ShopByCategory = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.h2_title}>Shop by category</h2>

      <div className={styles.categoryGrid}>
        <Link to="/phones" className={styles.categoryCard}>
          <img
            src="/img/shopbycategory/Phones.png"
            className={styles.categoryImage}
          />
          <p>Mobile phones</p>
          <span>{phones.length} models</span>
        </Link>

        <Link to="/tablets" className={styles.categoryCard}>
          <img
            src="/img/shopbycategory/tablets.png"
            className={styles.categoryImage}
          />
          <p>Tablets</p>
          <span>{tablets.length} models</span>
        </Link>

        <Link to="/accessories" className={styles.categoryCard}>
          <img
            src="/img/shopbycategory/accessories.png"
            className={styles.categoryImage}
          />
          <p>Accessories</p>
          <span>{accessories.length} models</span>
        </Link>
      </div>
    </section>
  );
};
