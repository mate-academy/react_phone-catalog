import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  return (
    <>
      <Link to="Favorites" className="header__icons--item">
        <img src="../img/icons/Favorites.svg" alt="heart" className="header__icons--img" />
      </Link>
    </>
  );
};

export default Favorites;
