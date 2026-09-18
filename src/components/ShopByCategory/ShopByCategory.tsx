import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ShopByCategory.module.scss';

type Props = {
  products: Product[];
};

export const ShopByCategory = ({ products }: Props) => {
  const getCount = (category: string) =>
    products.filter(p => p.category === category).length;

  return (
    <div className={styles.category} data-cy="categoryLinks">
      <h2 className={styles.category__title}>Shop by category</h2>
      <div className="columns is-mobile is-multiline">
        <div className="column is-one-third-tablet is-full-mobile">
          <Link to="/phones" className={styles.category__card}>
            <div className={styles.category__imageContainer}>
              <img
                src="img/category-phones.png"
                alt="Phones"
                className={styles.category__image}
              />
            </div>
            <h3 className={styles.category__name}>Mobile phones</h3>
            <p className={styles.category__count}>
              {getCount('phones')} models
            </p>
          </Link>
        </div>

        <div className="column is-one-third-tablet is-full-mobile">
          <Link to="/tablets" className={styles.category__card}>
            <div className={styles.category__imageContainer}>
              <img
                src="img/category-tablets.png"
                alt="Tablets"
                className={styles.category__image}
              />
            </div>
            <h3 className={styles.category__name}>Tablets</h3>
            <p className={styles.category__count}>
              {getCount('tablets')} models
            </p>
          </Link>
        </div>

        <div className="column is-one-third-tablet is-full-mobile">
          <Link to="/accessories" className={styles.category__card}>
            <div className={styles.category__imageContainer}>
              <img
                src="img/category-accessories.png"
                alt="Accessories"
                className={styles.category__image}
              />
            </div>
            <h3 className={styles.category__name}>Accessories</h3>
            <p className={styles.category__count}>
              {getCount('accessories')} models
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
