import React, { useCallback, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FavContext } from '../../context/FavContext';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoSearchResults } from '../../components/NoSearchResults';
import { ProductsList } from '../../components/ProductsList';
import { Search } from '../../components/Search';
import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { fav } = useContext(FavContext);

  const query = searchParams.get('query') || '';

  const getVisibleFav = useCallback(() => {
    const currentFav = [...fav];

    if (query) {
      return currentFav.filter(item => {
        return item.name.toLowerCase()
          .includes(query.toLowerCase());
      });
    }

    return currentFav;
  }, [fav, query]);

  const visibleFav = getVisibleFav();

  return (
    <div className="Favorites">
      {!!visibleFav.length && (
        <div className="CategoryPage__search">
          <Search />
        </div>
      )}

      <div className="container">
        <div className="Favorites__content">
          <Breadcrumbs page={['Favorites']} />

          <div className="Favorites__main-info">
            <h2 className="Favorites__title">
              Favorites
            </h2>

            <span className="Favorites__models-count">
              {query ? (
                `${visibleFav.length} result${visibleFav.length === 1 ? '' : 's'}`
              ) : (
                `${visibleFav.length} item${visibleFav.length === 1 ? '' : 's'}`
              )}
            </span>
          </div>

          {!visibleFav.length && query && (
            <NoSearchResults />
          )}

          {!visibleFav.length && (
            <div className="Favorites__no-items">
              There are no favorite items yet
            </div>
          )}

          <ProductsList products={visibleFav} />
        </div>
      </div>
    </div>
  );
};
