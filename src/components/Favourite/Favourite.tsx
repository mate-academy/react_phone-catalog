import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../store/index';
// import { FavProductsContext } from './FavProductsContext';
import './Favourite.scss';

export const Favourite = () => {
  // const { favourites } = useContext(FavProductsContext);
  const favourites = useSelector(getFavorites);

  return (
    <NavLink to="/favorite">
      <li className="nav nav__favorite" />
      {favourites.length > 0 && <span className="nav__favorite--span">{favourites.length}</span>}
    </NavLink>
  );
};
