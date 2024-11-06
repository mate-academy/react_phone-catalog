import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Favourites.module.scss';

import favourites from '../../images/icons/favourites.png';

type Props = {
  className?: string;
};

export const Favourites: React.FC<Props> = ({ className }) => {
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
      <img
        src={favourites}
        alt="Favourites"
        className={styles.favourites__image}
      />
    </NavLink>
  );
};
