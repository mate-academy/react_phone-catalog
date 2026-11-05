import { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { Menu } from '../Menu';
import { CartContext } from '../../../../store/CartContext';
import { FavoritesContext } from '../../../../store/FavoritesContext';
import { Counter } from '../Counter';
import { ThemeToggle } from '../ThemeToggle';
import { Search } from '../Search';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.navLink, { [styles.navLinkActive]: isActive });
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo} aria-label="Nice Gadgets"></Link>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/phones" className={getLinkClass}>
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink to="/tablets" className={getLinkClass}>
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink to="/accessories" className={getLinkClass}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <ThemeToggle />

      <button
        type="button"
        aria-label="Search"
        className={styles.searchButton}
        aria-expanded={isSearchOpen}
        onClick={() => {
          setIsSearchOpen(curent => !curent);
        }}
      >
        <span aria-hidden="true" className={styles.searchButtonIcon}></span>
      </button>

      {isSearchOpen && (
        <div className={styles.searchPopover}>
          <Search />
        </div>
      )}

      <div className={styles.action}>
        <Link
          to="/favorites"
          className={styles.actionLink}
          aria-label="Favorites"
        >
          <span
            className={styles.actionItemFavorites}
            aria-hidden="true"
          ></span>
          <Counter value={favorites.length} />
        </Link>

        <Link to="/cart" className={styles.actionLink} aria-label="Cart">
          <span className={styles.actionItemCart} aria-hidden="true"></span>
          <Counter value={totalCount} />
        </Link>
      </div>

      <button
        type="button"
        className={styles.menuButton}
        aria-label="Open menu"
        onClick={() => setIsMenuOpen(true)}
      >
        <span className={styles.menuIcon} aria-hidden="true" />
      </button>

      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};
