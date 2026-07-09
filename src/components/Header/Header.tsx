import React, { useEffect, useState } from 'react';
import './Header.scss';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../../Logo.png';

// ІМПОРТУЄМО КОНТЕКСТИ
import { useCart } from '../Cart/CartContext';
import { useFavourites } from '../FavouritesPage/FavouritesContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // ДІСТАЄМО ДАНІ З КОНТЕКСТІВ
  const { cart } = useCart();
  const { favourites } = useFavourites();

  // Рахуємо загальну кількість
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const favQuantity = favourites.length;

  // Закриваємо меню при зміні сторінки
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : '';
  };

  return (
    <header className="header">
      <div className="header__nav">
        {/* Лого та Навігація (ховається на мобілці через SCSS) */}
        <div className="header__nav__items">
          <NavLink to="/" className="header__nav__logo">
            <img src={logo} alt="logo" />
          </NavLink>

          <NavLink to="/" className="header__nav__items__item">Home</NavLink>
          <NavLink to="/phones" className="header__nav__items__item">Phones</NavLink>
          <NavLink to="/tablets" className="header__nav__items__item">Tablets</NavLink>
          <NavLink to="/accessories" className="header__nav__items__item">Accessories</NavLink>
        </div>

        <div className="header__nav__right">
          {/* Іконки (ховаються на мобілці через SCSS) */}
          <div className="header__nav__icons">
            <NavLink to="/favorites" className="header__nav__icons__fav">
              {favQuantity > 0 && (
                <span className="header__nav__icons__badge">{favQuantity}</span>
              )}
            </NavLink>

            <NavLink to="/cart" className="header__nav__icons__cart">
              {cartQuantity > 0 && (
                <span className="header__nav__icons__badge">{cartQuantity}</span>
              )}
            </NavLink>
          </div>

          {/* Бургер (з'являється тільки на мобілці через SCSS) */}
          <button
            type="button"
            className={`header__nav__burger ${isMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span className="header__nav__burger__line" />
          </button>
        </div>
      </div>

      {/* Мобільне меню */}
      <nav className={`header__menu ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="header__menu__content">
          <NavLink to="/" className="header__menu__item">Home</NavLink>
          <NavLink to="/phones" className="header__menu__item">Phones</NavLink>
          <NavLink to="/tablets" className="header__menu__item">Tablets</NavLink>
          <NavLink to="/accessories" className="header__menu__item">Accessories</NavLink>

          {/* Можна додати іконки кошика/фейворітс прямо в меню для мобілки */}
          <div className="header__menu__icons" style={{ display: 'flex', marginTop: '20px' }}>
            <NavLink to="/favorites" className="header__nav__icons__fav" style={{ borderLeft: 'none' }}>
              {favQuantity > 0 && <span className="header__nav__icons__badge">{favQuantity}</span>}
            </NavLink>
            <NavLink to="/cart" className="header__nav__icons__cart">
              {cartQuantity > 0 && <span className="header__nav__icons__badge">{cartQuantity}</span>}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};
