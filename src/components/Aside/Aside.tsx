import React, { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Aside.module.scss';
import { HEADER_ICONS, HEADER_NAVIGATION_LINKS } from '../../utils/constants';
import { useIsMobile } from '../../utils/hooks/useIsMobile';
// eslint-disable-next-line max-len
import { useCartAndFavouritesCount } from '../../utils/hooks/useCartAndFavouritesCount';

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const Aside: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const isMobile = useIsMobile();

  const { cartCount, favouritesCount, renderCountBadge } =
    useCartAndFavouritesCount();

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen, setIsMenuOpen]);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  if (!isMobile) {
    return null;
  }

  return (
    <aside
      className={classNames(styles.aside, {
        [styles['aside--open']]: isMenuOpen,
      })}
    >
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {HEADER_NAVIGATION_LINKS.map(link => (
            <li key={link.to} className={styles.nav__item}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  classNames(styles.nav__link, {
                    [styles['nav__link--active']]: isActive,
                  })
                }
                onClick={handleCloseMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.icons}>
        {HEADER_ICONS.map(icon => (
          <div key={icon} className={styles.icons__item}>
            <NavLink
              to={icon}
              className={({ isActive }) =>
                classNames(styles.icons__link, {
                  [styles['icons__item--active']]: isActive,
                })
              }
              onClick={handleCloseMenu}
            >
              <img
                src={`./icons/${icon}.svg`}
                alt={`${icon} icon`}
                className={styles.icons__icon}
              />

              {icon === 'cart' && cartCount ? (
                <span className={styles['icons__count-badge']}>
                  {renderCountBadge(cartCount)}
                </span>
              ) : null}

              {icon === 'favourites' && favouritesCount ? (
                <span className={styles['icons__count-badge']}>
                  {renderCountBadge(favouritesCount)}
                </span>
              ) : null}
            </NavLink>
          </div>
        ))}
      </div>
    </aside>
  );
};
