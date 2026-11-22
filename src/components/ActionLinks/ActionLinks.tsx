import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';
import { FaRegHeart } from 'react-icons/fa';
import { LuShoppingBag } from 'react-icons/lu';
import { FiMoon, FiSun } from 'react-icons/fi';
import classNames from 'classnames';

import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCartContext';
import { useFavorite } from '../../hooks/useFavoriteContext';
import { useStateContext } from '../../hooks/useStateContext';

import { BurgerMenu } from '../BurgerMenu';

import styles from './ActionLinks.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.actions__link, {
    [styles.active]: isActive,
  });

const NAV_LINKS: NavLinkItem[] = [
  { path: '/favorites', icon: FaRegHeart, label: 'favorites' },
  { path: '/cart', icon: LuShoppingBag, label: 'cart' },
];

type NavLinkItem = {
  path: string;
  icon: IconType;
  label: string;
};

type Props = {
  actionState?: 'header' | 'sidebar';
};

export const ActionLinks: React.FC<Props> = ({ actionState = 'header' }) => {
  const { theme, toggleTheme } = useTheme();
  const { cart } = useCart();
  const { favorite } = useFavorite();
  const { setIsMenuOpen } = useStateContext();

  const handleCloseMenu = () => {
    setIsMenuOpen(false);

    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div
      className={classNames(styles.actions, styles[`actions--${actionState}`])}
    >
      <button
        type="button"
        className={styles.actions__link}
        onClick={toggleTheme}
        aria-label={
          theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
        }
      >
        {theme === 'light' ? (
          <FiMoon className={styles['actions__action-icon']} />
        ) : (
          <FiSun className={styles['actions__action-icon']} />
        )}
      </button>

      {NAV_LINKS.map(({ path, icon: Icon, label }) => (
        <NavLink
          to={path}
          key={path}
          className={getLinkClass}
          onClick={handleCloseMenu}
          aria-label={label}
        >
          <div className={styles.actions__box}>
            <Icon className={styles['actions__action-icon']} />
            {cart.length > 0 && path === '/cart' && (
              <span className={styles.actions__count}>{cart.length}</span>
            )}
            {favorite.length > 0 && path === '/favorites' && (
              <span className={styles.actions__count}>{favorite.length}</span>
            )}
          </div>
        </NavLink>
      ))}

      {actionState === 'header' && (
        <div className={styles['actions__burger-menu']}>
          <BurgerMenu onClick={() => setIsMenuOpen(true)} />
        </div>
      )}
    </div>
  );
};
