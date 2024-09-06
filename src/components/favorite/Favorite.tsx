import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import styles from './favorite.module.scss';

import { ROUTES } from 'utils/constants/routes';
import { HeartIcon } from 'ui/icon/HeartIcon';

export const Favorite: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(pathname === ROUTES.FAVORITE);
  }, [pathname]);

  return (
    <NavLink
      to={ROUTES.FAVORITE}
      className={({ isActive }) =>
        cn(styles.favorite, isActive && styles.active)
      }
      title="Favorite"
      aria-label="Favorite"
    >
      <HeartIcon isFavorite={isOpen} />
    </NavLink>
  );
};
