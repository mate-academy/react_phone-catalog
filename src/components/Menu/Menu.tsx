import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Menu.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.link, { [styles.isActive]: isActive });

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.iconBtn, { [styles.isActive]: isActive });

  return (
    <nav className={cn(styles.menu, { [styles.isOpen]: isOpen })}>
      <div className={styles.content}>
        <ul className={styles.list}>
          <li>
            <NavLink to="/" className={getLinkClass} onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/phones" className={getLinkClass} onClick={onClose}>
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink to="/tablets" className={getLinkClass} onClick={onClose}>
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={getLinkClass}
              onClick={onClose}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={styles.footer}>
        <NavLink to="/favorites" className={getIconClass} onClick={onClose}>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/favourites.svg`}
            alt="Favorites"
          />
        </NavLink>

        <NavLink to="/cart" className={getIconClass} onClick={onClose}>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/cart.svg`}
            alt="Cart"
          />
        </NavLink>
      </div>
    </nav>
  );
};
