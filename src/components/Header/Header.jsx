import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useCart } from '../pages/ShoppingCart/cartContextHelpers';
import { FavouritesContext } from '../pages/FavouritesCart/favouritesContext';
import './Header.scss';

export const Header = () => {
  const cartItems = useCart()?.cartItems || [];
  const { favourites } = useContext(FavouritesContext);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 500);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [menuOpen]);

  const isActiveLink = path => location.pathname.startsWith(path);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const displayQuantity = totalQuantity > 99 ? 99 : totalQuantity;

  const totalFavourites = favourites.length > 99 ? 99 : favourites.length;
  const closeMenu = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsAnimating(false);
    }, 300);
  };

  const handleToggleMenu = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="logo">
          <NavLink to="/">
            <img
              onClick={scrollToTop}
              src="/images/icons/Logo_1.png"
              alt="logo"
              className="logo-img"
            />
          </NavLink>
        </div>

        {/* Бургер-меню для мобільної версії */}
        <button className="burger-button" onClick={handleToggleMenu}>
          <img
            src="/images/icons/Menu.svg"
            alt="burger"
            className={`burger-icon ${menuOpen ? 'fade-out' : 'fade-in'}`}
          />
          <img
            src="/images/icons/Close.svg"
            alt="close"
            className={`close-icon ${menuOpen ? 'fade-in' : 'fade-out'}`}
          />
        </button>

        {/* Навігація */}
        <nav
          className={`nav_link mobile ${menuOpen ? 'open' : ''} ${
            isAnimating ? 'animating' : ''
          }`}
        >
          <div className="nav_link-mobile-box nav-link-box">
            <NavLink
              onClick={closeMenu}
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              HOME
            </NavLink>
            <NavLink
              onClick={closeMenu}
              to="/phones"
              className={isActiveLink('/phones') ? 'active' : ''}
            >
              PHONES
            </NavLink>
            <NavLink
              onClick={closeMenu}
              to="/tablets"
              className={isActiveLink('/tablets') ? 'active' : ''}
            >
              TABLETS
            </NavLink>
            <NavLink
              onClick={closeMenu}
              to="/accessories"
              className={isActiveLink('/accessories') ? 'active' : ''}
            >
              ACCESSORIES
            </NavLink>
          </div>
        </nav>

        {/* Іконки для великих екранів */}
        <div className="icons">
          <NavLink
            to="/favourites"
            className={`icon-box cart-icon-box ${
              isActiveLink('/favourites') ? 'active' : ''
            }`}
          >
            <img src="/images/icons/Favourites.svg" alt="Favourites" />
            {totalFavourites > 0 && (
              <span className="cart-count-favourites">
                {totalFavourites === 100 ? '99+' : totalFavourites}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={`icon-box cart-icon-box ${
              isActiveLink('/cart') ? 'active' : ''
            }`}
          >
            <img src="/images/icons/Shopping_bag.svg" alt="Shopping_Bag" />
            {displayQuantity > 0 && (
              <span className="cart-count-cart">
                {displayQuantity === 100 ? '99+' : displayQuantity}
              </span>
            )}
          </NavLink>
        </div>
      </header>

      {/* Іконки для мобільної версії внизу */}
      {menuOpen && (
        <div className="mobile-bottom-icons">
          <div className="mobile-icon-wrapper">
            <NavLink
              to="/favourites"
              onClick={closeMenu}
              className={`icon-box ${
                isActiveLink('/favourites') ? 'active' : ''
              }`}
            >
              <div className="icon-wrapper">
                <img src="/images/icons/Favourites.svg" alt="Favourites" />
                {totalFavourites > 0 && (
                  <span className="cart-count-favourites">
                    {totalFavourites === 100 ? '99+' : totalFavourites}
                  </span>
                )}
              </div>
            </NavLink>
          </div>

          <div className="divider" />

          <div className="mobile-icon-wrapper">
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={`icon-box ${isActiveLink('/cart') ? 'active' : ''}`}
            >
              <div className="icon-wrapper">
                <img src="/images/icons/Shopping_bag.svg" alt="Cart" />
                {displayQuantity > 0 && (
                  <span className="cart-count-cart">
                    {displayQuantity === 100 ? '99+' : displayQuantity}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
