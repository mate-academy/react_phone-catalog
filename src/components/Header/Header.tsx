import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useShop } from '../../shared/context/ShopContext';
import styles from './Header.module.scss';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, favorites } = useShop();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const nav = (
    <>
      <NavLink to="/" onClick={() => setMenuOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/phones" onClick={() => setMenuOpen(false)}>
        Phones
      </NavLink>
      <NavLink to="/tablets" onClick={() => setMenuOpen(false)}>
        Tablets
      </NavLink>
      <NavLink to="/accessories" onClick={() => setMenuOpen(false)}>
        Accessories
      </NavLink>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="Nice Gadgets home">
          <span>NICE👌</span>
          <span>GADGETS</span>
        </Link>
        <nav className={styles.nav}>{nav}</nav>
        <div className={styles.actions}>
          <Link
            to="/favorites"
            className={styles.iconLink}
            aria-label="Favorites"
          >
            <img src="/img/icon-favorites.svg" alt="Favorites" />
            {favorites.length > 0 && <i>{favorites.length}</i>}
          </Link>
          <Link to="/cart" className={styles.iconLink} aria-label="Cart">
            <img src="/img/icon-cart.svg" alt="Cart" />
            {cartCount > 0 && <i>{cartCount}</i>}
          </Link>
        </div>
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </div>
      {menuOpen && (
        <nav className={styles.mobileNav}>
          {nav}
          <Link to="/favorites" onClick={() => setMenuOpen(false)}>
            Favorites
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart
          </Link>
        </nav>
      )}
    </header>
  );
}
