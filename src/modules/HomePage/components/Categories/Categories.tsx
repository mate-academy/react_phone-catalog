import { Link } from 'react-router-dom';
import { getImg } from '../../../../utils/getImageUrl';
import styles from './Categories.module.scss';

export const Categories = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.list}>
        <Link to="/phones" className={styles.item}>
          <div className={styles.imageWrapper}>
            <img
              src={getImg('/img/category-phones.png')}
              alt="Phones"
              className={styles.image}
            />
          </div>
          <h3 className={styles.itemTitle}>Mobile phones</h3>
          <p className={styles.itemCount}>95 models</p>
        </Link>

        <Link to="/tablets" className={styles.item}>
          <div className={styles.imageWrapper}>
            <img
              src={getImg('/img/category-tablets.png')}
              alt="Tablets"
              className={styles.image}
            />
          </div>
          <h3 className={styles.itemTitle}>Tablets</h3>
          <p className={styles.itemCount}>24 models</p>
        </Link>

        <Link to="/accessories" className={styles.item}>
          <div className={styles.imageWrapper}>
            <img
              src={getImg('/img/category-accessories.png')}
              alt="Accessories"
              className={styles.image}
            />
          </div>
          <h3 className={styles.itemTitle}>Accessories</h3>
          <p className={styles.itemCount}>100 models</p>
        </Link>
      </div>
    </section>
  );
};
