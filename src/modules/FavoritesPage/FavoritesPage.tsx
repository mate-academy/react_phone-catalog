import './FavoritesPage.scss';
import React, { useContext } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../../store/GlobalContext';
import { ProductsList } from '../shared/ProductsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(GlobalContext);

  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const normalizeProductsType =
    pathname.slice(1, 2).toUpperCase() + pathname.slice(2);

  let visibleFavorites = [...favorites];

  if (query.length) {
    visibleFavorites = visibleFavorites.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  const countFavorites = visibleFavorites.length;

  return (
    <div className="favoritesPage">
      <Breadcrumbs productType={'Favorites'} />
      <h1 className="favoritesPage__title">{normalizeProductsType}</h1>

      <span className="favoritesPage__description">
        {`${countFavorites} ${countFavorites === 1 ? 'model' : 'models'}`}
      </span>

      {countFavorites === 0 && query.length > 0 ? (
        <div className="favoritesPage__empty-content">
          {`There are no ${normalizeProductsType.toLowerCase()} matching the query`}
        </div>
      ) : countFavorites === 0 ? (
        <div className="favoritesPage__empty-content">Favorites is empty</div>
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
