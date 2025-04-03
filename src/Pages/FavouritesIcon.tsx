import React from 'react';
import { useCartContext } from '../CartContext/CartContext';
import { Link } from 'react-router-dom';

export const FavouritesIcon: React.FC = () => {
  const { favouritesCount } = useCartContext();

  return (
    <Link
      to="/favourites"
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <img src="./img/favourites.png" alt="favourites" width="24" height="24" />
      {favouritesCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 2,
            right: -7,
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '5px',
            fontSize: '8px',
          }}
        >
          {favouritesCount}
        </span>
      )}
    </Link>
  );
};
