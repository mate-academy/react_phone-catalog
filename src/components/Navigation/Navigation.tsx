import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Navigation.module.scss';
import { NAV_ICONS, NAV_LINKS } from '../../constants';
import type React from 'react';
import { asset } from '../../helper';
import { CartBadge } from '../../modules/CartPage/components/CartBadge';
import { FavoritesBadge } from '../../modules/FavoritesPage/components/FavoritesBadge'; // eslint-disable-line max-len

const getLinkClassName = (baseClass: string) => {
  return ({ isActive }: { isActive: boolean }) => {
    return classNames(styles[baseClass], { [styles.active]: isActive });
  };
};

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles['nav-links']}>
        {NAV_LINKS.map(link => (
          <li className={styles['nav-link-wrapper']} key={link.label}>
            <NavLink to={link.to} className={getLinkClassName('nav-link')}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className={styles['nav-icons']}>
        {NAV_ICONS.map(icon => (
          <li className={styles['nav-icon-wrapper']} key={icon.label}>
            <NavLink to={icon.to} className={getLinkClassName('nav-icon')}>
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
