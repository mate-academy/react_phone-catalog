import React from 'react';
import styles from './HeaderActions.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  getNavLinkClass: ({ isActive }: { isActive: boolean }) => string;
  favoritesCount: number;
  cartCount: number;
  actionLinks: {
    to: string;
    icon: string;
    alt: string;
    className: string;
  }[];
  setIsBurgerActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderActions: React.FC<Props> = ({
  getNavLinkClass,
  favoritesCount,
  cartCount,
  actionLinks,
  setIsBurgerActive,
}) => {
  return (
    <div className={styles.actions}>
      {actionLinks.map(({ to, icon, alt, className }) => (
        <button key={to} className={styles[className]}>
          <NavLink
            to={to}
            className={getNavLinkClass}
            onClick={() => setIsBurgerActive(false)}
          >
            <img src={icon} alt={alt} />
            {to === '/favorites' && favoritesCount > 0 && (
              <span className={styles.actions__count}>{favoritesCount}</span>
            )}

            {to === '/cart' && cartCount > 0 && (
              <span className={styles.actions__count}>{cartCount}</span>
            )}
          </NavLink>
        </button>
      ))}
    </div>
  );
};
