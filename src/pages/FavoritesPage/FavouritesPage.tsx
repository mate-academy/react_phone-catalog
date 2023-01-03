import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResults } from '../../components/NoResults';
import { ProductsList } from '../../components/ProductsList';
import {
  FavoritesContext,
} from '../../helpers/SavedItemsContext';
import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="container container--with-min-height">
      <div className="favorites-page">
        <div className="favorites-page__breadcrumbs">
          <Breadcrumbs />
        </div>
        <h1 className="main-title favorites-page__title">
          Favorites
        </h1>
        <div className="favorites-page__amount amount-subtitle">
          {`${favorites.length} products`}
        </div>
        {favorites.length === 0 ? (
          <NoResults />
        ) : (
          <ProductsList products={favorites} />
        )}
      </div>
    </div>
  );
};
