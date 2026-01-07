/* src/components/Menu/Menu.tsx */
import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Menu.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <nav className={cn(styles.menu, { [styles.isOpen]: isOpen })}>
      <div className={styles.content}>
        <ul className={styles.list}>
          <li>
            <NavLink to="/" className={styles.link} onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/phones" className={styles.link} onClick={onClose}>
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink to="/tablets" className={styles.link} onClick={onClose}>
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={styles.link}
              onClick={onClose}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={styles.footer}>
        <NavLink to="/favorites" className={styles.iconBtn} onClick={onClose}>
          {/* ✅ Poprawiona nazwa: favourites.svg */}
          <img src="/img/icons/favourites.svg" alt="Favorites" />
        </NavLink>
        <NavLink to="/cart" className={styles.iconBtn} onClick={onClose}>
          <img src="/img/icons/cart.svg" alt="Cart" />
        </NavLink>
      </div>
    </nav>
  );
};
