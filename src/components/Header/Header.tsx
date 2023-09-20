import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useContext } from 'react';
import cn from 'classnames';

import './Header.scss';
import { SearchBar } from '../SearchBar';
import { FavsContext } from '../../contexts/FavsContext';
import { CartContext } from '../../contexts/CartContext';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => (
  cn(
    'NavButton',
    { 'NavButton--selected': isActive },
  )
);

const getFavsLinkClass = ({ isActive }: { isActive: boolean }) => (
  cn(
    'SavedProductsButton',
    'SavedProductsButton--favs',
    { 'SavedProductsButton--selected': isActive },
  )
);

const getCartLinkClass = ({ isActive }: { isActive: boolean }) => (
  cn(
    'SavedProductsButton',
    'SavedProductsButton--cart',
    { 'SavedProductsButton--selected': isActive },
  )
);

export const Header = () => {
  const { pathname } = useLocation();
  const nestingDepth = pathname.split('/').filter(el => el !== '').length;
  const { favs } = useContext(FavsContext);
  const { cart } = useContext(CartContext);

  const showSearchBar = pathname !== '/'
    && pathname !== '/cart'
    && pathname !== '/menu'
    && nestingDepth === 1;

  const navigate = useNavigate();

  const handleMenuClick = () => {
    if (pathname === '/menu') {
      navigate(-1);
    }
  };

  return (
    <header className="Header">
      <div className="Header__content">
        <div className="Header__left-side">
          <NavLink
            to="/menu"
            className="Header__menu-button"
            onClick={handleMenuClick}
          >
            {' '}
          </NavLink>

          <div className="Header__logo-container">
            <Link to="/" className="Logo">
              <img
                className="Logo__img"
                src="./Logo.svg"
                alt="logo"
              />
            </Link>
          </div>

          <div className="Header__nav-container">
            <nav className="Nav">
              <NavLink to="/" className={getNavLinkClass}>
                HOME
              </NavLink>

              <NavLink to="/phones" className={getNavLinkClass}>
                PHONES
              </NavLink>

              <NavLink to="/tablets" className={getNavLinkClass}>
                TABLETS
              </NavLink>

              <NavLink to="/accessories" className={getNavLinkClass}>
                ACCESSORIES
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="Header__right-side">

          {showSearchBar && <SearchBar />}

          <NavLink to="/favs" className={getFavsLinkClass}>
            {favs.length !== 0 && (
              <div className="SavedProductsButton__amount">
                {favs.length}
              </div>
            )}
          </NavLink>

          <NavLink to="/cart" className={getCartLinkClass}>
            {cart.length !== 0 && (
              <div className="SavedProductsButton__amount">
                {cart.length}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
