import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from '../Menu/Menu';
import { useCart } from '../../context/CartContext';
import { useFavourite } from '../../context/FavContext';
import styles from './Header.module.scss';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const { favourites } = useFavourite();

  const totalItems = items.reduce((acc, item) => acc + item.count, 0);

  //#region handleFunctions
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  //#endregion

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="./img/logo/logo.png" alt="Nice Gadgets Logo" />
      </Link>

      <nav className={styles.nav}>
        <NavLink to="/" className={styles.navLink} end>
          Home
        </NavLink>
        <NavLink to="/phones" className={styles.navLink}>
          Phones
        </NavLink>
        <NavLink to="/tablets" className={styles.navLink}>
          Tablets
        </NavLink>
        <NavLink to="/accessories" className={styles.navLink}>
          Accessories
        </NavLink>
      </nav>

      <div className={styles.iconDesktop}>
        <Link to="/favourites" className={styles.iconLink}>
          <span className={styles.iconWrapper}>
            <img src="./img/icons/favourites_icon.svg" alt="Favourites icon" />
            {favourites.length > 0 && (
              <span className={styles.badge}>{favourites.length}</span>
            )}
          </span>
        </Link>
        <Link to="/cart" className={styles.iconLink}>
          <span className={styles.iconWrapper}>
            <img src="./img/icons/cart_icon.svg" alt="Cart icon" />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </span>
        </Link>
      </div>

      <button
        type="button"
        onClick={handleToggleMenu}
        className={styles.burger}
      >
        <img src="./img/burger_menu/burger_menu.svg" alt="Burger Menu" />
      </button>
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
};
