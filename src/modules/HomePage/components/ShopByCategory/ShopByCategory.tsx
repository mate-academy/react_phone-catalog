import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import img1 from '/img/category_img1.png';
import img2 from '/img/category_img2.png';
import img3 from '/img/category_img3.png';

import phones from '/api/phones.json?url';
import tablets from '/api/tablets.json?url';
import accessories from '/api/accessories.json?url';

export const ShopByCategory = () => {
  return (
    <section className={styles.shop_by_category}>
      <h2>Shop by category</h2>

      <div className={styles.categories_box}>
        <Link to={'/phones'} className={styles.category}>
          <img
            src={img1}
            alt="category image"
            className={styles.category_img}
          />
          <p className={styles.category_name}>Mobile phones</p>
          <p className={styles.category_description}>{phones.length} models</p>
        </Link>

        <Link to={'/tablets'} className={styles.category}>
          <img
            src={img2}
            alt="category image"
            className={styles.category_img}
          />
          <p className={styles.category_name}>Tablets</p>
          <p className={styles.category_description}>{tablets.length} models</p>
        </Link>

        <Link to={'/accessories'} className={styles.category}>
          <img
            src={img3}
            alt="category image"
            className={styles.category_img}
          />
          <p className={styles.category_name}>Accessories</p>
          <p className={styles.category_description}>
            {accessories.length} models
          </p>
        </Link>
      </div>
    </section>
  );
};
