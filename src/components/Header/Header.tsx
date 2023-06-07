import { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import { getSearchWith } from '../../helpers/SearchParams';
import favorite from '../../images/favourites.svg';
import cart from '../../images/Cart.svg';
import logo from '../../images/Logo.png';
import './Header.scss';

// const debounce = (f: Function, delay: number) => {
//   let timerId: any;

//   return (...args: any) => {
//     clearInterval(timerId);
//     timerId = setTimeout(f, delay, ...args)
//   }
// }

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query');
  const [inputValue, setInputValue] = useState(query || '');
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const conditionToRender
    = location.pathname === '/favourites'
      || location.pathname === '/phones'
      || location.pathname === '/tablets'
      || location.pathname === '/accessories';

  const handleInputChange = (value: string) => {
    setInputValue(value);

    const updatedSearchParams = getSearchWith(searchParams,
      { query: value || null });

    setSearchParams(new URLSearchParams(updatedSearchParams));
  };

  // const handleDebounceQuery = useCallback(debounce(handleInputChange, 1000), []);

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

  return (
    <header className="homepage-header">
      <nav className="header-navigation navigation-header">
        <div className="navigation-header__left">
          <ul className="navigation-header__list_left">
            <li className="navigation-header__item logo">
              <Link
                to="/"
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
                  placeholder="Search in phones..."
                  value={inputValue}
                  onChange={(event) => {
                    handleInputChange(event.target.value);
                    // handleDebounceQuery(event.target.value)
                  }}
                />
                {inputValue && (
                  <button
                    type="button"
                    className="navigation-header__clear-button"
                    onClick={handleButtonClick}
                  >
                    &times;
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
