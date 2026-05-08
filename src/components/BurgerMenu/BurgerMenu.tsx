import './BurgerMenu.module.scss';
import styles from './BurgerMenu.module.scss';
import { NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';

type Props = {
  isBurgerMenu: boolean;
  onClose: () => void;
};

const getActiveLink = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.menu__link, {
    'selected-link': isActive,
  });
};

const getActiveTab = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.icon, {
    'icon--active': isActive,
  });
};

export const BurgerMenu: React.FC<Props> = ({ isBurgerMenu, onClose }) => {
  return (
    isBurgerMenu && (
      <nav className="menu__nav">
        <div className={styles.menu__container}>
          <ul className={styles.menu__list}>
            <li>
              <NavLink to="/" className={getActiveLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/phones" className={getActiveLink}>
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablets" className={getActiveLink}>
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink to="/accessories" className={getActiveLink}>
                Accessories
              </NavLink>
            </li>
          </ul>

          <div className={styles.icons}>
            <NavLink to="/favorites" className={getActiveTab}>
              <Icon name="favourites" />
            </NavLink>
            <NavLink to="/cart" className={getActiveTab}>
              <Icon name="cart" />
            </NavLink>
          </div>
        </div>
      </nav>
    )
  );
};
