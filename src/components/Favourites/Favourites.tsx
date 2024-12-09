import React, { useContext } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { FavouritesContext } from '../../store/FavouritesContex';
import styles from './Favourites.module.scss';
import fav from '../../images/icons/favourites.svg';

type Props = {
  className?: string;
};

export const Favourites: React.FC<Props> = ({ className }) => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <NavLink
      to="/favourites"
      className={({ isActive }) =>
        cn(
          styles.favourites__item,
          { [styles['favourites__item--active']]: isActive },
          className,
        )
      }
    >
      <img src={fav} alt="Favourites" className={styles.favourites__image} />
      {favourites.length > 0 && (
        <span className={styles.favourites__count}>{favourites.length}</span>
      )}
    </NavLink>
  );
};
