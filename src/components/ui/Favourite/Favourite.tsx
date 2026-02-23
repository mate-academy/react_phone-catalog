import React from 'react';

import { NavLink } from 'react-router-dom';
import favouriteIcon from '../../../assets/icons/favourites-heart-like.svg';
import styles from './Favourite.module.scss';

interface FavouriteProps {
  className: string;
}

export const Favourite: React.FC<FavouriteProps> = ({ className }) => {
  return (
    <NavLink to="/favorites" className={className}>
      <img src={favouriteIcon} alt="Favorites" className={styles.icon} />
    </NavLink>
  );
};
