import { NavLink } from 'react-router-dom';
import './Header.scss';
import { useFavourites } from '../../contexts/Favourites';
import { useEffect, useState } from 'react';
import { Menu } from '../menu';
import { useCart } from '../../contexts/Cart';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count: favoritesCount } = useFavourites();
  const { count: cartCount } = useCart();

  useEffect(() => {
    isMenuOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = '');
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        <div className="header__nav">
          <div className="header__logo">
            <NavLink to="/">
              <img src="./img/main-logo.png" alt="mainLogo" className="header__logo__img" />
            </NavLink>
          </div>

          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'nav__item__link nav__item__link--active' : 'nav__item__link'
                  }
                >
                  home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    isActive ? 'nav__item__link nav__item__link--active' : 'nav__item__link'
                  }
                >
                  phones
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    isActive ? 'nav__item__link nav__item__link--active' : 'nav__item__link'
                  }
                >
                  tablets
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    isActive ? 'nav__item__link nav__item__link--active' : 'nav__item__link'
                  }
                >
                  accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header__bttns">
          <ul className="header__bttns__list">
            {!isMenuOpen && (
              <li
                className="header__bttns__item header__bttns__item--phone"
                onClick={() => setIsMenuOpen(true)}
              >
                <img src="/img/menu.png" alt="burgerLogo" className="header__bttns__logo" />
              </li>
            )}
            {isMenuOpen && (
              <li
                className="header__bttns__item header__bttns__item--phone"
                onClick={() => setIsMenuOpen(false)}
              >
                <img src="/img/close.svg" alt="closeLogo" className="header__bttns__logo" />
              </li>
            )}
            <li className="header__bttns__item header__bttns__item--tablet">
              <NavLink to="/favourites" className="favourites">
                <img
                  src="/img/favourites.png"
                  alt="favouritesLogo"
                  className="header__bttns__logo"
                />
                {favoritesCount > 0 && <div className="favourites__counter">{favoritesCount}</div>}
              </NavLink>
            </li>
            <li className="header__bttns__item header__bttns__item--tablet">
              <NavLink to="/cart" className="cart">
                <img
                  src="/img/cart.png"
                  alt="favocart"
                  className="header__bttns__logo"
                />
                {cartCount > 0 && <div className="cart__counter">{cartCount}</div>}
              </NavLink>
            </li>
          </ul>
        </div>
      </header>

      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};
