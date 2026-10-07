import { Link, useSearchParams } from 'react-router-dom';
import { useProductsContext } from '../../../../hook/useProductsContext';
import styles from './FavoritesPage.module.scss';
import { ProductsList } from '../../../shared/components/ProductsList';

export const FavoritesPage = () => {
  const { favouriteProducts } = useProductsContext();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.trim().toLowerCase() ?? '';

  const filteredProducts = favouriteProducts.filter(product => {
    return product.name.toLowerCase().includes(query);
  });

  return (
    <div className={`${styles.favourite} container`}>
      <div className={styles.breadcrumbs}>
        <ul className={styles.breadcrumbs__list}>
          <li className={styles.breadcrumbs__item}>
            <Link to="/" className={styles.breadcrumbs__link}>
              <img
                src="./img/home.png"
                alt=""
                className={styles.breadcrumbs__img}
              />
            </Link>
          </li>

          <li className={styles.breadcrumbs__item}>
            <img
              src="./img/arrRight.png"
              alt=""
              className={styles.breadcrumbs__icon}
            />
          </li>

          <li className={styles.breadcrumbs__item}>
            <span className={styles.breadcrumbs__name}>Favorites</span>
          </li>
        </ul>
      </div>

      <h1 className={styles.favourite__title}>Favourites</h1>

      <p
        className={styles.favourite__count}
      >{`${favouriteProducts.length} items`}</p>

      {query && filteredProducts.length === 0 ? (
        <p className={styles.favourite__empty}>
          There are no products matching the query
        </p>
      ) : (
        <ProductsList products={filteredProducts} />
      )}
    </div>
  );
};
