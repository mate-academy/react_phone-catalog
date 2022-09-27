import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useCounter } from '../../components/Context/Context';

import './FavoritesPage.scss';
import '../../styles/PageNav.scss';
import { ProductCard } from '../../components/ProductCard';
import { SearchList } from '../../components/SearchList';

export const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

  const context = useCounter();

  const setActive = (
    { isActive }: { isActive: boolean },
  ) => (isActive ? 'PageNav__link PageNav__link--isActive' : 'PageNav__link');

  const getFavorigesFromStorage = () => {
    const getFavorites = localStorage.getItem('favorites') || '';

    const parseFavorites = JSON.parse(getFavorites);

    return parseFavorites;
  };

  useEffect(() => {
    const getFavorites = getFavorigesFromStorage();

    setFavorites(getFavorites);
  }, [context?.countFavorites]);

  return (
    <div className="container">
      <div className="FavoritesPage">
        {
          search.length <= 0
            ? (
              <>
                <div className="PageNav__nav">
                  <NavLink className="PageNav__link" to="/">
                    <i className="icon-Home PageNav__icon" />
                  </NavLink>
                  <i className="icon-Chevron-Arrow-Right PageNav__arrow" />
                  <NavLink
                    to="/favorites"
                    className={setActive}
                  >
                    Favorites
                  </NavLink>
                </div>
                <h2 className="FavoritesPage__title">Favorites</h2>
                <span
                  className="FavoritesPage__subTitle"
                >
                  {favorites.length}
                  {' '}
                  {favorites.length >= 2 ? 'items' : 'item'}
                </span>
                <div className="FavoritesPage__list">
                  {
                    favorites.length >= 1
                      ? favorites
                        .map(prod => (
                          <ProductCard key={prod.id} product={prod} />
                        ))
                      : ''
                  }
                </div>
              </>
            )
            : <SearchList devices={favorites} />
        }

      </div>
    </div>
  );
};
