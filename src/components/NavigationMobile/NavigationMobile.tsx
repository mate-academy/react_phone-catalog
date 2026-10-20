import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NavigationMobile.module.scss';
import React, { useEffect } from 'react';
import { NAV_ICONS, NAV_LINKS } from '../../constants';
import { asset } from '../../helper';

import { FavoritesBadge } from '../../modules/FavoritesPage/components/FavoritesBadge'; // eslint-disable-line max-len
import { CartBadge } from '../../modules/CartPage/components/CartBadge';

const getLinkClassName = (baseClass: string) => {
  return ({ isActive }: { isActive: boolean }) => {
    return classNames(styles[baseClass], { [styles.active]: isActive });
  };
};

type Props = {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
};

export const NavigationMobile: React.FC<Props> = ({
  isNavOpen,
  setIsNavOpen,
}) => {
  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }

    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [isNavOpen]);

  const handleLinkClick = () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  return (
    <nav
      className={classNames(styles.nav, {
        [styles.open]: isNavOpen,
      })}
    >
      <ul className={styles['nav-links']}>
        {NAV_LINKS.map(link => (
          <li className={styles['nav-link-wrapper']} key={link.label}>
            <NavLink
              to={link.to}
              className={getLinkClassName('nav-link')}
              onClick={handleLinkClick}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className={styles['nav-icons']}>
        {NAV_ICONS.map(icon => (
          <li className={styles['nav-icon-wrapper']} key={icon.label}>
            <NavLink
              to={icon.to}
              className={getLinkClassName('nav-icon')}
              onClick={handleLinkClick}
            >
              <img
                src={asset(`/img/${icon.label.toLowerCase()}.svg`)}
                alt={`${icon.label}`}
              />
              {icon.label === 'Cart' && <CartBadge />}
              {icon.label === 'Favorites' && <FavoritesBadge />}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
