import React, { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../../store/GlobalContext';
import './FavoritesPage.scss';
import { ProductsList } from '../shared/ProductsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';

export const FavoritesPage: React.FC = () => {
  const { favorites, query } = useContext(GlobalContext);

  const { pathname } = useLocation();

  const normalizeProductsType =
    pathname.slice(1, 2).toUpperCase() + pathname.slice(2);

  const visibleFavorites = useMemo(() => {
    let filteredFavorites = [...favorites];

    if (query.length) {
      filteredFavorites = filteredFavorites.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }

    return filteredFavorites;
  }, [favorites, query]);

  const countFavoritesProducts = visibleFavorites.length;

  return (
    <div className="favoritesPage">
      <Breadcrumbs productType={'Favorites'} />
      <h1 className="favoritesPage__title">{normalizeProductsType}</h1>

      <span className="favoritesPage__description">
        {`${countFavoritesProducts} ${
          countFavoritesProducts === 1 ? 'model' : 'models'
        }`}
      </span>

      {countFavoritesProducts === 0 ? (
        <div className="favoritesPage__empty-content">Favourites is empty</div>
      ) : (
        <div className="favoritesPage__content">
          <ProductsList
            products={visibleFavorites}
            displayType={'with-discount'}
          />
        </div>
      )}
    </div>
  );
};
