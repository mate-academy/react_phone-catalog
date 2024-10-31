import React from 'react';
import './Favourites.scss';

export const Favourites = () => {
  return (
    <div className="favourites">
      <a href="#favourites" className="favourites__link">
        <img
          src="../../../img/favourites.svg"
          alt="Fvourites items"
          className="favourites__image"
        />
      </a>
    </div>
  );
};
