import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './FavouritesPage.module.scss';
import { AppContext } from '../../context/AppContext';
import { ErrorComponent } from '../../components/ErrorComponent';
import { ProductList } from '../../components/ProductList';

export const FavouritesPage = () => {
  const { favourites = [], error } = useContext(AppContext) || {};

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className={`${styles.favourites} container`}>
      <Breadcrumbs />

      <h1 className={`${styles.favourites__title}`}>Favourites</h1>

      {favourites.length > 0 ? (
        <>
          <p className={`${styles.favourites__count}`}>
            {favourites.length} {favourites.length === 1 ? 'item' : 'items'}
          </p>

          <ProductList />
        </>
      ) : (
        <h3 className={`${styles.favourites__noProducts}`}>
          There are no products yet
        </h3>
      )}
    </div>
  );
};
