import React from 'react';
import { useCartContext } from '../../CartContext/useCartContext';
import { Link } from 'react-router-dom';

export const FavouritesIcon: React.FC = () => {
  const { favouritesCount } = useCartContext();

  return (
    <Link
      to="/favourites"
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '24px 24px',
      }}
    >
      <img
        src="./img/favourites.png"
        alt="favourites"
        width="24"
        height="24"
      />
      {favouritesCount > 0 && (
        <span
          style={{
            height: 10,
            width: 10,
            position: 'absolute',
            top: 15,
            right: 15,
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '5px',
            fontSize: '10px',
            textAlign: 'center',
          }}
        >
          {favouritesCount}
        </span>
      )}
    </Link>
  );
};
