import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useContext } from 'react';
import { FavouriteContext } from '../../ContextProvider';
import { ProductCard } from '../../components/ProductCard';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const FavoritesPage = () => {
  const { favouriteProducts } = useContext(FavouriteContext);

  const numOfProductsTitle = !favouriteProducts.length
    ? 'No products'
    : favouriteProducts.length === 1
      ? '1 model'
      : `${favouriteProducts.length} models`;

  return (
    <section className={styles.favoritesPageWrapper}>
      <Breadcrumbs productList={favouriteProducts} />
      <div className={styles.favoritesPageContainer}>
        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.categoryNumModels}>{numOfProductsTitle}</p>
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
              <Link to={'/'} className={classNames('ctaBtn', styles.ctaBtn)}>
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
