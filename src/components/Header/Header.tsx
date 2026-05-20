import { NavLink } from 'react-router-dom';
import React from 'react';
import { useContext } from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';
import '../../mixin.scss';
import { Asaid } from '../Asaid/Asaid';
import { MenuContext } from '../../context/MenuContext';

type Props = {
  cartCount?: number;
  favoritesCount?: number;
};

export const Header: React.FC<Props> = ({
  cartCount = 0,
  favoritesCount = 0,
}) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-item  ${isActive ? 'isActive' : ''}`;
  const menu = useContext(MenuContext);

  if (!menu) {
    return null;
  }

  return (
    <header className={styles.container}>
      <NavLink to="/" className={styles.logo}>
        <img src="/img/logo.svg" alt="Logo" className="logo" />
      </NavLink>

      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/" className={cn(styles.navItem, getLinkClass)}>
              HOME
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/phones" className={cn(styles.navItem, getLinkClass)}>
              PHONES
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/tablets" className={cn(styles.navItem, getLinkClass)}>
              TABLETS
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/accessories"
              className={cn(styles.navItem, getLinkClass)}
            >
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.actionsIcon}>
        <NavLink to="/favorites" className={styles.icon} aria-label="Favorites">
          <img
            src="/img/favorites.svg"
            className={styles.iconImgFavorites}
            alt="Favourites"
          />
          {favoritesCount > 0 && (
            <span className="badge">{favoritesCount}</span>
          )}
        </NavLink>

        <NavLink to="/cart" className={styles.icon} aria-label="Cart">
          <img src="/img/cart.svg" className={styles.iconImgCart} alt="Cart" />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </NavLink>
      </div>

      <div className={styles.burgerMenuMaxWidth}>
        <button className={styles.burgerMenu} onClick={menu.toggleMenu}>
          <img src="/img/burger-mob.svg" alt="BurgerMenu" />
        </button>
      </div>

      {menu.isMenuOpen && <Asaid onClose={menu.closeMenu} />}
    </header>
  );
};
