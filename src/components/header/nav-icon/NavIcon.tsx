import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './NavIcon.module.scss';

type TProps = {
  text: string;
  products: number;
  children: ReactNode;
  ROUTE: string;
  closeMenu?: () => void;
};

export const NavIcon: FC<TProps> = ({
  children,
  closeMenu,
  text,
  products,
  ROUTE,
}) => {
  const hasProducts = !!products;
  const isFavorite = text === 'Favorite';

  return (
    <NavLink
      to={ROUTE}
      className={({ isActive }) =>
        cn(styles.navIcon, isActive && styles.active)
      }
      onClick={closeMenu}
      title={text}
      aria-label={text}
    >
      <div>
        {children}
        {hasProducts && (
          <span
            className={cn(styles.count, isFavorite && styles.countFavorite)}
          >
            {products}
          </span>
        )}
      </div>
    </NavLink>
  );
};
