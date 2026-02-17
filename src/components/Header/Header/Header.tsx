import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import './Header.scss';
import { useFavourites } from '../../../context/FavoritesContext';
import { useCart } from '../../../context/CartContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count } = useFavourites();
  const { cartCount } = useCart();

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <div className="grid header__grid">
            <div className="header__left">
              <Link to="/">
                <img src="img/Logo.svg" alt="Logo" />
              </Link>

              <nav className="header__sections">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    'header__section' +
                    (isActive ? ' header__section--active' : '')
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    'header__section' +
                    (isActive ? ' header__section--active' : '')
                  }
                >
                  Phones
                </NavLink>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    'header__section' +
                    (isActive ? ' header__section--active' : '')
                  }
                >
                  Tablets
                </NavLink>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    'header__section' +
                    (isActive ? ' header__section--active' : '')
                  }
                >
                  Accessories
                </NavLink>
              </nav>
            </div>
            <div className="header__right">
              <div className="header__icons">
                <Link to="/favorites" className="header__icon">
                  <img
                    src="img/Heart_Header.svg"
                    alt="liked"
                    className="header_heart"
                  />

                  {count > 0 && <span className="header__badge">{count}</span>}
                </Link>

                <Link to="/cart" className="header_cart">
                  <img src="img/Store_Header.svg" alt="store" />
                  {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
                </Link>
              </div>

              <NavLink to="/CartPage">
                <img
                  src="img/Burger.png"
                  alt="menu"
                  onClick={() => setIsMenuOpen(true)}
                  className="header__burger"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};
