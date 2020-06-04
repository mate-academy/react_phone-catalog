import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Favorite.scss';
import { FavoritesContext } from '../../../helpers/FavoritesContext';


const Favorite = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <>
      <NavLink
        to="/favorite"
        className="favorite-link"
      >
        <img src="./img/favorite.svg" alt="favorite" />
        {favorites.length > 0 && <span className="favorite-link__span">{favorites.length}</span>}
      </NavLink>
    </>
  );
};

export default Favorite;
