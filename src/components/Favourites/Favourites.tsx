import React, { useContext } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { FavouritesContext } from '../../store/FavouritesContex';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import styles from './Favourites.module.scss';
import fav from '../../images/icons/favourites.svg';
import fav_dark from '../../images/icons/fav_for_dark.svg';

type Props = {
  className?: string;
};

export const Favourites: React.FC<Props> = ({ className }) => {
  const { favourites } = useContext(FavouritesContext);
  const { theme } = useContext(ThemeContext);

  return (
    <NavLink
      to="/favourites"
      className={({ isActive }) =>
        cn(
          theme === Theme.Light
            ? styles.favourites__item
            : styles['favourites__item--dark'],
          { [styles['favourites__item--active']]: isActive },
          className,
        )
      }
    >
      <img
        src={theme === Theme.Light ? fav : fav_dark}
        alt="Favourites"
        className={styles.favourites__image}
      />
      {favourites.length > 0 && (
        <span className={styles.favourites__count}>{favourites.length}</span>
      )}
    </NavLink>
  );
};
