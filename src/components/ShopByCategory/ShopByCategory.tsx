import styles from './ShopByCategory.module.scss';
import phonesImg from './../../img/images/phones.png';
import tabletsImg from './../../img/images/tablets.png';
import accessoriesImg from './../../img/images/accessories.png';
import { Link } from 'react-router-dom';

export const ShopByCategory: React.FC = () => {
  return (
    <section className={styles.ShopByCategory}>
      <div className="container">
        <h2 className={styles.title}>Shop by category</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.images}>
              <Link to="/phones">
                <img src={phonesImg} alt="" className={styles.img} />
              </Link>
            </div>
            <div className={styles.text}>
              <h3 className={styles.subTitle}>Mobile phones</h3>
              <p className={styles.models}>95 models</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.images}>
              <Link to="/tablets">
                <img src={tabletsImg} alt="" className={styles.img} />
              </Link>
            </div>
            <div className={styles.text}>
              <h3 className={styles.subTitle}>Tablets</h3>
              <p className={styles.models}>24 models</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.images}>
              <Link to="/accessories">
                <img src={accessoriesImg} alt="" className={styles.img} />
              </Link>
            </div>
            <div className={styles.text}>
              <h3 className={styles.subTitle}>Accessories</h3>
              <p className={styles.models}>100 models</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
