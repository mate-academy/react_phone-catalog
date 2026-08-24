import styles from './categories.module.scss';
import { Link } from 'react-router-dom';
import products from '../../../public/api/products.json';

export const Categories = () => {
  const counts = {
    phones: products.filter(product => product.category === 'phones').length,
    tablets: products.filter(product => product.category === 'tablets').length,
    accessories: products.filter(product => product.category === 'accessories')
      .length,
  };

  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.card__link}>
            <Link to="/phones" className={styles.card__phones}>
              <img
                className={styles.card__phones__img}
                src={`${import.meta.env.BASE_URL}/img/category-phones.png`}
                alt="image phones"
              />
            </Link>
          </div>

          <p className={styles.card__name}>Mobile phones</p>
          <p className={styles.card__amount}>{counts.phones} models</p>
        </div>

        <div className={styles.card}>
          <div className={styles.card__link}>
            <Link to="/tablets" className={styles.card__tablets}>
              <img
                className={styles.card__tablets__img}
                src={`${import.meta.env.BASE_URL}/img/category-tablets.png`}
                alt="image tablets"
              />
            </Link>
          </div>

          <p className={styles.card__name}>Tablets</p>
          <p className={styles.card__amount}>{counts.tablets} models</p>
        </div>

        <div className={styles.card}>
          <div className={styles.card__link}>
            <Link to="/accessories" className={styles.card__accessories}>
              <img
                className={styles.card__accessories__img}
                src={`${import.meta.env.BASE_URL}/img/category-accessories.png`}
                alt="image accessories"
              />
            </Link>
          </div>

          <p className={styles.card__name}>Accessories</p>
          <p className={styles.card__amount}>{counts.accessories} models</p>
        </div>
      </div>
    </div>
  );
};
