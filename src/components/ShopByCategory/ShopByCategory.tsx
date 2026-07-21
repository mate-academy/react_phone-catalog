import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/getAssetUrl';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <section className={styles.category}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.grid}>
        <Link to="/phones" className={styles.card}>
          <div className={styles.photoWrap}>
            <img
              src={getAssetUrl('/img/category-phones.png')}
              alt="Phones"
              className={styles.photo}
            />
          </div>
          <span className={styles.name}>Phones</span>
        </Link>
        <Link to="/tablets" className={styles.card}>
          <div className={styles.photoWrap}>
            <img
              src={getAssetUrl('/img/category-tablets.png')}
              alt="Tablets"
              className={styles.photo}
            />
          </div>
          <span className={styles.name}>Tablets</span>
        </Link>
        <Link to="/accessories" className={styles.card}>
          <div className={styles.photoWrap}>
            <img
              src={getAssetUrl('/img/category-accessories.png')}
              alt="Accessories"
              className={styles.photo}
            />
          </div>
          <span className={styles.name}>Accessories</span>
        </Link>
      </div>
    </section>
  );
};
