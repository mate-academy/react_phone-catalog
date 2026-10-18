import { NavLink } from 'react-router-dom';

import { useShop } from '../../../../context/ShopContext';

import styles from './Header.module.scss';

export const Header = () => {
  const { favoriteItems, cartQuantities } = useShop();

  const favoritesCount = favoriteItems.length;

  const cartCount = Object.values(cartQuantities).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          NICE GADGETS
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/phones">Phones</NavLink>

          <NavLink to="/tablets">Tablets</NavLink>

          <NavLink to="/accessories">Accessories</NavLink>
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={styles.actionLink}
            aria-label={`Favorites (${favoritesCount})`}
          >
            ♡
            {favoritesCount > 0 && (
              <span className={styles.counter}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={styles.actionLink}
            aria-label={`Cart (${cartCount})`}
          >
            🛒
            {cartCount > 0 && (
              <span className={styles.counter}>{cartCount}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
