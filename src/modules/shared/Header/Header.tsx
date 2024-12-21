import React, { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import { GlobalContext } from '../../../store/GlobalContext';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__nav-link', {
    'header__nav-link--active': isActive,
  });

const getIconClass = ({ isActive }: { isActive: boolean }) =>
  classNames({
    'header__icon--active': isActive,
  });

export const Header: React.FC = () => {
  const { query, setQuery, shoppingCart, favorites } =
    useContext(GlobalContext);

  const location = useLocation();

  const totalQuantity = shoppingCart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const totalFavorites = favorites.length;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearInput = () => {
    setQuery('');
  };

  return (
    <div className="header">
      <Link to="/" className="header__logo-container">
        <img src="logo.svg" alt="Nice Gadgets" className="header__logo" />
      </Link>

      <div className="header__menu">
        <ul className="header__list">
          <li className="header__nav-item">
            <NavLink className={getLinkClass} to="/">
              home
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink className={getLinkClass} to="phones">
              Phones
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink className={getLinkClass} to="tablets">
              tablets
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink className={getLinkClass} to="accessories">
              accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="header__buttons-right">
        {location.pathname !== '/' && (
          <div className="header__search-wrapper">
            <input
              type="text"
              placeholder="Search product..."
              className="header__search-input"
              value={query}
              onChange={handleInputChange}
            />
            {query && (
              <button className="header__clear-button" onClick={clearInput}>
                ×
              </button>
            )}
          </div>
        )}
        <NavLink to="#" className="header__icon header__icon--menu"></NavLink>
        <NavLink className="header__icon-container" to="favorites">
          <div
            className={classNames(
              'header__icon--favourite',
              getIconClass({ isActive: location.pathname === '/favorites' }),
            )}
          >
            {totalFavorites > 0 && (
              <span className="header__totalFavorites">{totalFavorites}</span>
            )}
          </div>
        </NavLink>

        <NavLink className="header__icon-container" to="cart">
          <div
            className={classNames(
              'header__icon--shoping_bag',
              getIconClass({ isActive: location.pathname === '/cart' }),
            )}
          >
            {totalQuantity > 0 && (
              <span className="header__cart-quantity">{totalQuantity}</span>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
