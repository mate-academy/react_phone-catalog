import './header.scss';
import logo from '../../images/header/logo-nice-gadgets.png';
import cartIcon from '../../images/header/logo-cart.png';
import favIcon from '../../images/header/logo-favourites.png';
import menuIcon from '../../images/header/logo-menu.png';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Aside } from '../aside';
import { FC, useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { useFavorites } from '../../components/favoritesContext/favoritesContext';
import { useCart } from '../../components/cartContext/cartContext';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export const Header: FC<HeaderProps> = ({ setIsMenuOpen, isMenuOpen }) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') || '');

  const location = useLocation();
  const isProductPage =
    location.pathname.startsWith('/phones') ||
    location.pathname.startsWith('/tablets') ||
    location.pathname.startsWith('/accessories');

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (inputValue) {
        params.set('query', inputValue);
      } else {
        params.delete('query');
      }

      setSearchParams(params);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, searchParams, setSearchParams]);

  useEffect(() => {
    setInputValue('');
  }, [location.pathname]);

  return (
    <>
      {isMenuOpen ? (
        <Aside setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      ) : (
        ' '
      )}
      <header className="header">
        <div className="header__top">
          <img
            src={logo}
            alt="Nice Gadgets Logo"
            className="header__top--logo"
          />
        </div>

        <nav className="header__nav">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'header__nav--itens active' : 'header__nav--itens'
            }
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            HOME
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'header__nav--itens active' : 'header__nav--itens'
            }
            to="/phones"
            onClick={() => setIsMenuOpen(false)}
          >
            PHONES
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'header__nav--itens active' : 'header__nav--itens'
            }
            to="/tablets"
            onClick={() => setIsMenuOpen(false)}
          >
            TABLETS
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'header__nav--itens active' : 'header__nav--itens'
            }
            to="/accessories"
            onClick={() => setIsMenuOpen(false)}
          >
            ACCESSORIES
          </NavLink>
        </nav>
        {isProductPage && (
          <div className="header__search">
            <input
              type="text"
              placeholder="Search..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="header__search--input"
            />
          </div>
        )}

        <div className="header__menu">
          <div className="header__menu--box mobileBox">
            <img
              src={menuIcon}
              alt="Menu"
              className="header__menu--icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? 'header__menu--box active tabletBox'
                : 'header__menu--box tabletBox'
            }
          >
            <div className="favoritesWrapper">
              <img
                src={favIcon}
                alt="Favorites"
                className="header__menu--icon"
                onClick={() => setIsMenuOpen(false)}
              />
              {favorites.length > 0 && (
                <span className="favoritesWrapper__count">
                  {favorites.length}
                </span>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? 'header__menu--box active tabletBox'
                : 'header__menu--box tabletBox'
            }
          >
            <div className="cartWrapper">
              <img
                src={cartIcon}
                alt="Cart"
                className="header__menu--icon"
                onClick={() => setIsMenuOpen(false)}
              />
              {cart.length > 0 && (
                <span className="cartWrapper__count">{cart.length}</span>
              )}
            </div>
          </NavLink>
        </div>
      </header>
    </>
  );
};
