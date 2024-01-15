import { BreadCrumbs } from '../../components/BreadCrumbs';

import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const getFavoritesProduct = localStorage.getItem('favourites');
  const favProducts = getFavoritesProduct
    ? JSON.parse(getFavoritesProduct) : [];

  return (
    <div className="container">
      <div className="FavouritesPage">
        <BreadCrumbs />
        <h1 className="FavouritesPage__title">Favourites</h1>
        <p className="FavouritesPage__count">
          {favProducts ? `${favProducts.length} ${favProducts.length <= 1 ? 'model' : 'models'}` : '0 models'}
        </p>
      </div>
    </div>
  );
};
