import { useState, useContext, useRef } from 'react';
import classNames from 'classnames';
import {
  NavLink,
  useLocation,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import favoriteIcon from '../../img/favourites.svg';

import './header.scss';
import cartIcon from '../../img/cart.svg';
import searchIcon from '../../img/search.png';
import close from '../../img/close.png';
import menuImg from '../../img/menu.svg';
import { ProductsContext } from '../ProductsContext/ProductsContext';

export const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const { favoriteProducts, cartProducts } = useContext(ProductsContext);
  const prevLocation = useRef('');

  const handleSeatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', e.target.value);
    setSearchParams(params);

    setIsSearching(e.target.value.length > 0);

    if (e.target.value.length === 0) {
      params.delete('query');
      setSearchParams(params);
    }
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    setSearchParams(params);
    setIsSearching(false);
  };

  const prodactsPages = ['/phones', '/tablets', '/accessories'];
  const isProdactsPage = prodactsPages.includes(location.pathname);

  const getCurrentImg = location.pathname === '/menu' ? close : menuImg;
  const getCorrectLink =
    location.pathname === '/menu' ? prevLocation.current : '/menu';
  const handleNovigeteMenu = () => {
    if (location.pathname === '/menu') {
      navigate(prevLocation.current);
    } else {
      prevLocation.current = location.pathname;
      navigate('/menu');
    }
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__left-side">
          <NavLink to="/" className="header__logo">
            Logo
          </NavLink>

          <nav className="header__nav">
            <NavLink
              to="/"
              className={classNames('header__nav-link', {
                'header__nav-link--active': location.pathname === '/',
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="/phones"
              className={classNames('header__nav-link', {
                'header__nav-link--active': location.pathname === '/phones',
              })}
            >
              Phones
            </NavLink>

            <NavLink
              to="/tablets"
              className={classNames('header__nav-link', {
                'header__nav-link--active': location.pathname === '/tablets',
              })}
            >
              Tablets
            </NavLink>

            <NavLink
              to="/accessories"
              className={classNames('header__nav-link', {
                'header__nav-link--active':
                  location.pathname === '/accessories',
              })}
            >
              Accessories
            </NavLink>
          </nav>
        </div>
        <div className="header__right-side">
          <NavLink
            to={getCorrectLink}
            type="button"
            className="header__menu-btn"
            onClick={() => handleNovigeteMenu()}
          >
            <img src={getCurrentImg} alt="menu" />
          </NavLink>

          <div className="header__wrapper-actiions-right">
            {isProdactsPage && (
              <p className="header__search">
                <input
                  type="text"
                  placeholder="Search in phones..."
                  className="header__search--input"
                  value={query}
                  onChange={handleSeatchChange}
                />
                <button
                  className="header__search--icon-btn"
                  type="button"
                  onClick={clearSearch}
                >
                  <img
                    src={isSearching ? close : searchIcon}
                    alt="search-icon"
                  />
                </button>
              </p>
            )}

            <NavLink
              to="/favorites"
              className={classNames('header__nav-link  header__favorites', {
                'header__favorites--active': location.pathname === '/favorites',
              })}
            >
              <img
                className="header__icon"
                src={favoriteIcon}
                alt="favorite-icon"
              />
              {favoriteProducts.length > 0 && (
                <span className="header__checkedProduct">
                  {favoriteProducts.length}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={classNames('header__nav-link  header__cart', {
                'header__cart--active': location.pathname === '/cart',
              })}
            >
              <img className="header__icon" src={cartIcon} alt="cart-icon" />
              {cartProducts.length > 0 && (
                <span className="header__checkedProduct">
                  {cartProducts.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
