import styles from './FavoritesPage.module.scss';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import productsData from '../../api/products.json';
import { ProductsList } from '../../components/ProductsList';

import { Product } from '../../types/Product';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const products: Product[] = productsData as unknown as Product[];
  const favoriteProducts = products.filter(product =>
    favorites.includes(product.id),
  );

  return (
    <section className={styles.favorites_page}>
      <div className={styles.favorites_page__box}>
        <Link to="/">
          <img
            className={styles.favorites_page__box__home}
            src="/img/icons/home.svg"
            alt="Home"
          />
        </Link>

        <img
          className={styles.favorites_page__box__arrow}
          src="/img/icons/right.svg"
          alt=""
        />

        <span className={styles.favorites_page__box__breadcrumb}>
          Favourites
        </span>
      </div>

      <div className={styles.favorites_page__title}>
        <h1 className={styles.favorites_page__title_text}>Favourites</h1>

        <p className={styles.favorites_page__count}>
          {favoriteProducts.length} items
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <p className={styles.favorites_page__empty}>Your favourites is empty</p>
      ) : (
        <ProductsList products={favoriteProducts} />
      )}
    </section>
  );
};
