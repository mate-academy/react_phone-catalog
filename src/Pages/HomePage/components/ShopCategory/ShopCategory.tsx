import styles from './ShopCategory.module.scss';
import phones from '../../../../shared/images/categories/phone-category.png';
import tablets from '../../../../shared/images/categories/tablets-category.png';
import accessories from '../../../../shared/images/categories/accessories.webp';
import { Link } from 'react-router-dom';

export const ShopCategory = () => {
  return (
    <section className={styles.shopcategory}>
      <h2 className={styles.shopcategory__title}>Shop by category</h2>
      <article className={styles.category}>
        <Link
          to="/phones"
          className={styles.category__background}
          style={{ backgroundColor: '#FEEAEA' }}
        >
          <img src={phones} alt="phones" className={styles.category__image} />
        </Link>
        <div className="category__info">
          <h4>Mobile phones</h4>
          <p className={`${styles.category__models} body-text`}>124 models</p>
        </div>
      </article>
      <article className={styles.category}>
        <Link
          to="/tablets"
          className={styles.category__background}
          style={{ background: 'linear-gradient(180deg, #addcee, #d1e9f3)' }}
        >
          <img src={tablets} alt="tablets" className={styles.category__image} />
        </Link>
        <div className="category__info">
          <h4>Tablets</h4>
          <p className={`${styles.category__models} body-text`}>36 models</p>
        </div>
      </article>
      <article className={styles.category}>
        <Link
          to="/accessories"
          className={styles.category__background}
          style={{ backgroundColor: '#EDE9E3' }}
        >
          <img
            src={accessories}
            alt="accessories"
            className={styles.category__image}
          />
        </Link>
        <div className="category__info">
          <h4>Accessories</h4>
          <p className={`${styles.category__models} body-text`}>34 models</p>
        </div>
      </article>
    </section>
  );
};
