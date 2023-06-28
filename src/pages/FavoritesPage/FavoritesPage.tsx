import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Products } from '../../components/Products';
import { Notification } from '../../components/Notification';
import './favoritesPage.scss';
import { useFilteredProducts } from '../../hooks/useFilteredProducts';
import { PathContainer } from '../../components/PathContainer';

export const FavoritesPage: FC = () => {
  const theme = useAppSelector(state => state.theme.value);
  const favoriteProducts
    = useAppSelector(state => state.favoriteProducts.value);
  const searchBar = useAppSelector(state => state.searchBar.value);

  const filteredProducts = useFilteredProducts(favoriteProducts, searchBar);

  const renderProducts = () => {
    if (!filteredProducts.length) {
      return (
        <Notification message={`There is no such a product as ${searchBar}`} />
      );
    }

    return (
      <div className="favorite-page__products">
        <Products products={filteredProducts} />
      </div>
    );
  };

  return (
    <div className="favorite-page">
      <div className="favorite-page__wrapper">
        <PathContainer pathArray={['Favorites']} />

        <h1 className={`title title--${theme}`}>
          Favorites
        </h1>
        {!!favoriteProducts.length && (
          <p className={`favorite-page__sum favorite-page__sum--${theme}`}>
            {`${favoriteProducts.length} items`}
          </p>
        )}
      </div>

      {!favoriteProducts.length ? (
        <Notification message="There are no favorites items" />
      ) : (
        renderProducts()
      )}
    </div>
  );
};
