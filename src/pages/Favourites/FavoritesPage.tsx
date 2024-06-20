import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { FavouritesContext } from '../../contexts/favoritesContext';
import { SearchTypes } from '../../types/SearchTypes';
import { NoSearchResults } from '../../components/NoResult/NoSearchResults';
import { ProductsList } from '../../components/ProductList/ProductList';

import './favoritesPage.scss';

import {
  NotificationContext,
  NotificationStatus,
} from '../../contexts/notificationContext';
import { filterProducts } from '../../helpers/filterProducts';

export const FavoritesPage: React.FC = () => {
  const { favorites, setFavorites } = useContext(FavouritesContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get(SearchTypes.Query) || '';
  const filteredFavorites = filterProducts(favorites, searchQuery);

  const { setNotification } = useContext(NotificationContext);

  const handleFavoritesReset = () => {
    setFavorites([]);
    setNotification({
      message: 'Favorites are cleared',
      color: NotificationStatus.Error,
    });
  };

  return (
    <div className="favorites-page">
      <div className="favorites-page__crumbs">
        <BreadCrumbs />
      </div>

      <div className="favorites-page__wrap">
        <h1 className="favorites-page__title">
          Favoruites
        </h1>

        {favorites.length > 0 && !searchQuery && (
          <button
            type="button"
            className="favorites-page__clear-all"
            onClick={handleFavoritesReset}
          >
            Clear all
          </button>
        )}
      </div>

      {favorites.length > 0 ? (
        <>
          {filteredFavorites.length > 0 ? (
            <ProductsList
              products={filteredFavorites}
            />
          ) : (
            <NoSearchResults />
          )}
        </>
      ) : (
        <div className="favorites-page__empty">
          <h1 className="favorites-page__empty-title">
            Your favorites are empty...
          </h1>
          <p className="cart-page__empty-description">
            You can always fill it with our products :&#41;
          </p>
        </div>
      )}
    </div>
  );
};
