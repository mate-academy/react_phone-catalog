import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../redux';

export const Favorites = () => {
  const favorites: Product[] = useSelector(getFavorites);

  return (
    <div className="favorites">
      <Link to="/favorites" className="favorites__button" />
      {favorites.length > 0
      && <span className="favorites__indicator">{favorites.length}</span>}
    </div>
  );
};
