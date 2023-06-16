import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import { useDebounce } from '../../helpers/useDebounce';
import { getSearchWith } from '../../helpers/SearchParams';
import favorite from '../../images/favourites.svg';
import cart from '../../images/Cart.svg';
import logo from '../../images/Logo.png';
import search from '../../images/search.svg';
import union from '../../images/Union.svg';
import './Header.scss';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query');
  const [inputValue, setInputValue] = useState(query || '');
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);
  const debouncedValue = useDebounce(debouncedInputValue, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  const conditionToRender
    = location.pathname === '/favourites'
      || location.pathname === '/phones'
      || location.pathname === '/tablets'
      || location.pathname === '/accessories';

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setDebouncedInputValue(value);
  };

  const handleSearchClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleButtonClick = () => {
    setInputValue('');
    searchParams.delete('query');
    setSearchParams(new URLSearchParams(searchParams.toString()));
  };

  useEffect(() => {
    const updateCounts = () => {
      const favouriteItems = localStorage.getItem('favourites');
      const cartItems = localStorage.getItem('cart');

      if (favouriteItems !== null) {
        setFavouriteCount(JSON.parse(favouriteItems).length);
      }

      if (cartItems !== null) {
        setCartCount(JSON.parse(cartItems).length);
      }
    };

    updateCounts();

    window.addEventListener('favouritesUpdated', updateCounts);
    window.addEventListener('cartUpdated', updateCounts);

    return () => {
      window.removeEventListener('favouritesUpdated', updateCounts);
      window.removeEventListener('cartUpdated', updateCounts);
    };
  }, []);

  useEffect(() => {
    setInputValue(query || '');
  }, [query]);

  useEffect(() => {
    const updatedSearchParams = getSearchWith(searchParams,
      { query: debouncedValue || null });

    setSearchParams(new URLSearchParams(updatedSearchParams));
  }, [debouncedValue]);

  return (
    <header className="homepage-header">
      <nav className="header-navigation navigation-header">
        <div className="navigation-header__left">
          <ul className="navigation-header__list_left">
            <li className="navigation-header__item logo">
              <Link
                to="home"
                className="navigation-header__link"
              >
                <img
                  className="navigation-header__image"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </li>
            <li className="navigation-header__item_l">
              <NavLink
                to="/"
                className={({ isActive }) => classNames(
                  'navigation-header__link', {
                    'is-active-link': isActive,
                  },
                )}
              >
                Home
              </NavLink>
            </li>
            <li className="navigation-header__item_l">
              <NavLink
                to="/phones"
                className={({ isActive }) => classNames(
                  'navigation-header__link', {
                    'is-active-link': isActive,
                  },
                )}
              >
                Phones
              </NavLink>
            </li>
            <li className="navigation-header__item_l">
              <NavLink
                to="/tablets"
                className={({ isActive }) => classNames(
                  'navigation-header__link', {
                    'is-active-link': isActive,
                  },
                )}
              >
                Tablets
              </NavLink>
            </li>
            <li className="navigation-header__item_l">
              <NavLink
                to="/accessories"
                className={({ isActive }) => classNames(
                  'navigation-header__link', {
                    'is-active-link': isActive,
                  },
                )}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navigation-header__right">
          <ul className="navigation-header__list_right">
            {conditionToRender && (
              <li
                className={classNames({
                  'navigation-header__item': true,
                  'navigation-header__item_input': true,
                })}
              >
                <input
                  data-cy="NameFilter"
                  type="text"
                  className="navigation-header__input"
                  placeholder={`Search in ${location.pathname.substring(1)}...`}
                  value={inputValue}
                  ref={inputRef}
                  onChange={(event) => {
                    handleInputChange(event.target.value);
                  }}
                />
                {inputValue ? (
                  <button
                    className="navigation-header__clear-button input-button"
                    onClick={handleButtonClick}
                    type="button"
                  >
                    <img src={union} alt="clearButton" />
                  </button>
                ) : (
                  <button
                    className="navigation-header__search-button input-button"
                    onClick={handleSearchClick}
                    type="button"
                  >
                    <img src={search} alt="search" />
                  </button>
                )}
              </li>
            )}
            <li className="navigation-header__item">
              <Link to="/favourites" className="navigation-header__link">
                <img
                  className="navigation-header__image"
                  src={favorite}
                  alt="favorites"
                />
              </Link>
              <div className="navigation-header__count">{favouriteCount}</div>
            </li>
            <li className="navigation-header__item">
              <Link to="/cart" className="navigation-header__link">
                <img
                  className="navigation-header__image"
                  src={cart}
                  alt="cart"
                />
              </Link>
              <div className="navigation-header__count">{cartCount}</div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
