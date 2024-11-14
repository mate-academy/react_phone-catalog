import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useContext } from 'react';
import { FavouriteContext } from '../../ContextProvider';
import { ProductCard } from '../../components/ProductCard';
import { Link } from 'react-router-dom';

export const FavoritesPage = () => {
  const { favouriteProducts } = useContext(FavouriteContext);

  return (
    <section className={styles.favoritesPageWrapper}>
      <Breadcrumbs productList={favouriteProducts} />
      <div className={styles.favoritesPageContainer}>
        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.categoryNumModels}>
          {favouriteProducts.length} models
        </p>
        <div className={styles.mainPartContainer}>
          {favouriteProducts.length ? (
            <div className={styles.productsContainer}>
              {favouriteProducts.map(product => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <>
              <p className={styles.titleEmpty}>
                Your favorites will appear here.
                Start&nbsp;adding&nbsp;some&nbsp;items&nbsp;you&nbsp;like!
              </p>
              <Link to={'/'} className="ctaBtn">
                Find Your Favorites
              </Link>
              <div className={styles.emptyFavImg}></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
