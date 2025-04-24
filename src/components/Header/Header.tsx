import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import favoriteIcon from '../../assets/img/Icons/favorite.png';
import cartIcon from '../../assets/img/Icons/cart.svg';
import handIcon from '../../assets/img/hand.svg';
// import logo from '../../assets/img/logo.png'; // Removed single logo import
import './Header.scss';

export const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Pages that should show the back button
  const pagesWithBackButton = ['/cart', '/favorites'];
  const shouldShowBackButton = pagesWithBackButton.some(page =>
    location.pathname.startsWith(page),
  );

  // Get page title based on the current path
  const getPageTitle = () => {
    if (location.pathname.startsWith('/cart')) {
      return 'Cart';
    }

    if (location.pathname.startsWith('/favorites')) {
      return 'Favourites';
    }

    return '';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__content">
        {shouldShowBackButton ? (
          <>
            <button
              className="header__back-button"
              onClick={handleBack}
              aria-label="Go back"
            >
              <span className="header__back-icon">←</span>
              <span className="header__back-text">Back</span>
            </button>

            <h1 className="header__page-title">{getPageTitle()}</h1>
          </>
        ) : (
          <>
            <div className="header__logo">
              <Link to="/" className="header__logo-link">
                <div className="header__logo-container">
                  <div className="header__logo-text">
                    <div className="header__logo-nice-container">
                      <span className="header__logo-nice">NICE</span>
                      <img
                        src={handIcon}
                        alt="OK"
                        className="header__logo-hand"
                      />
                    </div>
                    <span className="header__logo-gadgets">GADGETS</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                    }
                  >
                    HOME
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink
                    to="/phones"
                    className={({ isActive }) =>
                      `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                    }
                  >
                    PHONES
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink
                    to="/tablets"
                    className={({ isActive }) =>
                      `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                    }
                  >
                    TABLETS
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink
                    to="/accessories"
                    className={({ isActive }) =>
                      `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                    }
                  >
                    ACCESSORIES
                  </NavLink>
                </li>
              </ul>
            </nav>
          </>
        )}

        {/* Mobile Burger Menu Button */}
        <button
          className={`header__burger-button ${isMobileMenuOpen ? 'header__burger-button--active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </button>

        <div className="header__icons">
          <Link to="/favorites" className="header__icon-button">
            <span className="header__icon header__icon--favorites">
              <img
                src={favoriteIcon}
                alt="Favorites"
                className="header__icon-img"
              />
            </span>
            {favorites.length > 0 && (
              <span className="header__icon-counter">{favorites.length}</span>
            )}
          </Link>
          <Link to="/cart" className="header__icon-button">
            <span className="header__icon header__icon--cart">
              <img src={cartIcon} alt="Cart" className="header__icon-img" />
            </span>
            {cartItemsCount > 0 && (
              <span className="header__icon-counter">{cartItemsCount}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="header__mobile-menu" ref={mobileMenuRef}>
          <div className="header__mobile-menu-content">
            {/* Logo section at the top of the menu */}
            <div className="header__mobile-menu-header">
              <div className="header__logo">
                <Link to="/" className="header__logo-link">
                  <div className="header__logo-container">
                    <div className="header__logo-text">
                      <div className="header__logo-nice-container">
                        <span className="header__logo-nice">NICE</span>
                        <img
                          src={handIcon}
                          alt="OK"
                          className="header__logo-hand"
                        />
                      </div>
                      <span className="header__logo-gadgets">GADGETS</span>
                    </div>
                  </div>
                </Link>
              </div>

              <button
                className="header__mobile-close-button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="header__mobile-close-icon">✕</span>
              </button>
            </div>

            <nav className="header__mobile-nav">
              <ul className="header__mobile-nav-list">
                <li className="header__mobile-nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `header__mobile-nav-link ${isActive ? 'header__mobile-nav-link--active' : ''}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    HOME
                  </NavLink>
                </li>
                <li className="header__mobile-nav-item">
                  <NavLink
                    to="/phones"
                    className={({ isActive }) =>
                      `header__mobile-nav-link ${isActive ? 'header__mobile-nav-link--active' : ''}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    PHONES
                  </NavLink>
                </li>
                <li className="header__mobile-nav-item">
                  <NavLink
                    to="/tablets"
                    className={({ isActive }) =>
                      `header__mobile-nav-link ${isActive ? 'header__mobile-nav-link--active' : ''}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    TABLETS
                  </NavLink>
                </li>
                <li className="header__mobile-nav-item">
                  <NavLink
                    to="/accessories"
                    className={({ isActive }) =>
                      `header__mobile-nav-link ${isActive ? 'header__mobile-nav-link--active' : ''}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ACCESSORIES
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="header__mobile-footer">
              <Link
                to="/favorites"
                className="header__mobile-footer-button"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src={favoriteIcon}
                  alt="Favorites"
                  className="header__mobile-footer-icon"
                />
              </Link>
              <Link
                to="/cart"
                className="header__mobile-footer-button"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src={cartIcon}
                  alt="Cart"
                  className="header__mobile-footer-icon"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
