import React, { useContext } from 'react';
import './Favourite.scss';
import { StateContext } from 'src/store';

const Favourite = () => {
  const { favourites } = useContext(StateContext);
  const isFavorites = favourites.length > 0;

  return (
    <div className="favourite">
      <div className="favourite__icon">
        <img
          src="icons/favourite.png"
          alt="favourite__logo"
          className="favorite__img"
        />
        {isFavorites && (
          <div className="favourite__counter">{favourites.length}</div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
