import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/logo.png';
import favoritesIcon from '../../assets/icons/favorites_icon.png';
import cartIcon from '../../assets/icons/cart_icon.png';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { useEffect, useState } from 'react';
import BurgerIcon from '../../assets/icons/burger_icon.png';
import CloseIcon from '../../assets/icons/delete_icon.png';
import { useScrollLock } from '../../hooks/useScrollLock';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'Header-nav-Item is-active' : 'Header-nav-Item';
const getLinkClass2 = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'Header-iconContainer-item is-active'
    : 'Header-iconContainer-item';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { favorites } = useFavorites();
  const { totalCount } = useCart();

  useScrollLock(isMenuOpen);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 640px)');
    const handleResize = () => {
      if (desktopQuery.matches) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    desktopQuery.addEventListener('change', handleResize);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      desktopQuery.removeEventListener('change', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className={isMenuOpen ? 'Header is-menu-open' : 'Header'}>
      <div className="Header-top">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} className="Header-logo" alt="Logo" />
        </Link>

        <button
          type="button"
          className="Header-burger"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="header-menu"
          onClick={() => setIsMenuOpen(open => !open)}
        >
          <img
            className="Header-burger-icon"
            src={isMenuOpen ? CloseIcon : BurgerIcon}
            alt="="
          />
        </button>
      </div>

      <div className="Header-menu" id="header-menu">
        <nav className="Header-navContainer">
          <ul className="Header-nav">
            <li>
              <NavLink to="/" end className={getLinkClass} onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={getLinkClass}
                onClick={closeMenu}
              >
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={getLinkClass}
                onClick={closeMenu}
              >
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={getLinkClass}
                onClick={closeMenu}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="Header-iconContainer">
          <NavLink
            to="/favorites"
            className={getLinkClass2}
            onClick={closeMenu}
          >
            <img
              src={favoritesIcon}
              alt="Favorites"
              className="Header-iconContainer-item-icon"
            />
            {favorites.length > 0 && (
              <span className="Header-favoritesCount">{favorites.length}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={getLinkClass2} onClick={closeMenu}>
            <img
              src={cartIcon}
              alt="Cart"
              className="Header-iconContainer-item-icon"
            />
            {totalCount > 0 && (
              <span className="Header-favoritesCount">{totalCount}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
