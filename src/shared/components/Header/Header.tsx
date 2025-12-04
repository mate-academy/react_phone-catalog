import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { IconButton } from '../IconButton';
import { useContext } from 'react';
import { FavoriteContext } from '../../contexts/FavoriteContext';
import { CartContext } from '../../contexts/CartContext';

const menuItems = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header = () => {
  const { favorites } = useContext(FavoriteContext);
  const { cartItems } = useContext(CartContext);

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} grid-24 ${styles.grid}`}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img
              className={styles.logo_img}
              src="/logo/img.png"
              alt="Nice Gadgets logo"
            />
          </NavLink>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {menuItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <IconButton
            to="/favorites"
            src="/icons/heart.svg"
            alt="Favorites"
            count={favorites.length}
          />
          <IconButton
            to="/cart"
            src="/icons/basket.svg"
            alt="Cart"
            count={cartItems.length}
          />
        </div>
      </div>
    </header>
  );
};
