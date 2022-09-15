import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useCounter } from '../../components/Context/Context';

import './FavoritesPage.scss';
import '../../styles/PageNav.scss';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const context = useCounter();

  const setActive = ({ isActive }: { isActive: boolean }) => (isActive ? 'PageNav__link PageNav__link--isActive' : 'PageNav__link');

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
        <div className="PageNav__nav">
          <NavLink className="PageNav__link" to="/">
            <i className="icon-Home PageNav__icon" />
          </NavLink>
          <i className="icon-Chevron-Arrow-Right PageNav__arrow" />
          <NavLink to="/favorites" className={setActive}>Favorites</NavLink>
        </div>
        <h2 className="FavoritesPage__title">Favorites</h2>
        <div className="FavoritesPage__list">
          {favorites.map(prod => <ProductCard product={prod} />)}
        </div>
      </div>
    </div>
  );
};
