import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FavouritesContext } from '../../storage/favoriteContext';
import { BreadCrumbs } from '../../components/BreadCrumps';
import { ProductsList } from '../../components/ProductList';

import './favoritesPage.scss';
import { SearchTypes } from '../../types/search';
import { filterQuery } from '../../components/ProductsLayot/ultis';
import { NoSearchResults } from '../../components/NoSearchResolt';
import {
  NotificationContext,
  NotificationStatus,
} from '../../storage/notificationContext';

export const FavoritesPage: React.FC = () => {
  const { favorites, setFavorites } = useContext(FavouritesContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get(SearchTypes.Query) || '';
  const filteredFavorites = filterQuery(favorites, searchQuery);
  const { setNotification } = useContext(NotificationContext);

  const handleFavoritesReset = () => {
    setFavorites([]);
    setNotification({
      message: 'Favorites are cleared', color: NotificationStatus.Error,
    });
  };

  return (
    <div className="favorites-page">
      <BreadCrumbs />

      <div className="favorites-page__top">
        <h1 className="favorites-page__title">Favourites</h1>

        <p className="favorites-page__counter">
          {`${favorites.length} items`}
          {searchQuery && ` / ${filteredFavorites.length} results`}
        </p>

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
