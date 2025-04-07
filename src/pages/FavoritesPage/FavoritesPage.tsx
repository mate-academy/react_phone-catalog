/* eslint-disable prettier/prettier */
import './FavoritesPage.scss';
import { FC, useContext, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { ProductsList } from '../shared/ProductsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';

export const FavoritesPage: FC = () => {
  const { favorites } = useContext(GlobalContext);

  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const normalizeProductsType = useMemo(
    () => pathname.slice(1, 2).toUpperCase() + pathname.slice(2),
    [pathname],
  );

  const filteredFavorites = useMemo(
    () =>
      query.length
        ? favorites.filter(({ name }) =>
          name.toLowerCase().includes(query.toLowerCase().trim()),
        )
        : favorites,
    [favorites, query],
  );

  return (
    <div className="favoritesPage">
      <Breadcrumbs productType="Favorites" />
      <h1 className="favoritesPage__title">{normalizeProductsType}</h1>

      <span className="favoritesPage__description">
        {`${filteredFavorites.length} ${filteredFavorites.length === 1 ? 'model' : 'models'}`}
      </span>

      {filteredFavorites.length ? (
        <div className="favoritesPage__content">
          <ProductsList
            products={filteredFavorites}
            displayType="with-discount"
          />
        </div>
      ) : (
        <div className="favoritesPage__empty-content">
          {query.length
            ? `No ${normalizeProductsType.toLowerCase()} match your query`
            : 'Your favorites list is empty'}
        </div>
      )}
    </div>
  );
};
