import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';

export const Favorites: React.FC = () => {
  const { favourites } = useContext(StoreContext);
  return <NavLink to="/favorites">Favorites ({favourites.length})</NavLink>;
};
