import React, { useCallback, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { HEADER_ICONS } from '../../utils/constants';
import { Navigation } from '../Navigation';
// eslint-disable-next-line max-len
import { useCartAndFavouritesCount } from '../../utils/hooks/useCartAndFavouritesCount';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { cartCount, favouritesCount, renderCountBadge } =
    useCartAndFavouritesCount();

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isMenuOpen);

    return () => document.body.classList.remove('no-scroll');
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
  }, [setIsMenuOpen]);

  const renderIconWithBadge = (icon: string, count: number | null) => (
    <NavLink
      to={icon}
      className={({ isActive }) =>
        classNames(styles.icons__item, {
          [styles['icons__item--active']]: isActive,
        })
      }
      key={icon}
    >
      <button className={styles.icons__button}>
        <img
          src={`./icons/${icon}.svg`}
          alt={`${icon} icon`}
          className={styles.icons__icon}
        />
        {count ? (
          <span className={styles['icons__count-badge']}>
            {renderCountBadge(count)}
          </span>
        ) : null}
      </button>
    </NavLink>
  );

  return (
    <header className={styles.header}>
      <div className={styles.header__main}>
        <Link to="/" className={styles.logo}>
          <img
            className={styles.logo__img}
            src="./img/logo.svg"
            alt="Logo Nice Gadgets"
          />
        </Link>
        <Navigation />
      </div>
      <div className={styles.icons}>
        {HEADER_ICONS.map(icon => {
          const count =
            icon === 'cart'
              ? cartCount
              : icon === 'favourites'
                ? favouritesCount
                : null;

          return renderIconWithBadge(icon, count);
        })}
        <div
          className={classNames(
            styles.icons__item,
            styles['icons__item--mobile'],
          )}
        >
          <img
            src={isMenuOpen ? './icons/close.svg' : './icons/menu.svg'}
            alt={isMenuOpen ? 'Close menu' : 'Open menu'}
            className={styles.icons__icon}
            onClick={toggleMenu}
          />
        </div>
      </div>
    </header>
  );
};
