import React, { useCallback } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../images/logo.svg';
import favouritesImg from '../../images/favourites-hart-like.svg';
import bag from '../../images/shopping-bag.svg';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import magnifier from '../../images/search.svg';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  classNames('list__link', {
    'list__link--active': isActive,
  })
);

// eslint-disable-next-line
function debounce(callback: Function, delay: number) {
  let timerId = 0;

  return (...args: any) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const Header: React.FC = () => {
  const location = useLocation();
  const {
    cartPhones,
    favourites,
    query,
    setQuery,
    setAppliedQuery,
  } = useProducts();
  const page = location.pathname.replace('/', '');

  const [, setSearchParams] = useSearchParams();

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set('query', event.target.value);

      if (!newParams.get('query')) {
        newParams.delete('query');
      }

      return newParams;
    });
  };

  const resetSearchParams = () => {
    setQuery('');
    setAppliedQuery('');
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.delete('query');

      return newParams;
    });
  };

  return (
    <header className="header top-bar">
      <div className="top-bar__nav">
        <NavLink className="logo" to="/">
          <img className="logo__image" src={logo} alt="Logo" />
        </NavLink>
        {!location.pathname.includes('cart') && (
          <ul className="list">
            <li className="list__item">
              <NavLink
                className={getLinkClass}
                to="/"
                onClick={resetSearchParams}
              >
                Home
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink
                className={getLinkClass}
                to="/phones"
                onClick={resetSearchParams}
              >
                Phones
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink
                className={getLinkClass}
                to="/tablets"
                onClick={resetSearchParams}
              >
                Tablets
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink
                className={getLinkClass}
                to="/accessories"
                onClick={resetSearchParams}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="top-bar__options">
        {(page === 'favourites'
          || page === 'phones'
          || page === 'tablets'
          || page === 'accessories')
          && (
            <label
              htmlFor="input"
              className="top-bar__option top-bar__input-container"
            >
              <input
                id="input"
                className="top-bar__input"
                type="text"
                placeholder={`Search in ${page}...`}
                value={query}
                onChange={(event) => handleQueryChange(event)}
              />
              {query ? (
                <button
                  className="top-bar__clear-query"
                  type="button"
                  onClick={resetSearchParams}
                  aria-label="clear-query"
                />
              ) : (
                <img src={magnifier} alt="magnifier-icon" />
              )}
            </label>
          )}
        {!location.pathname.includes('cart') && (
          <NavLink
            className={classNames('top-bar__option', {
              'cart-is-active': location.pathname.includes('favourites'),
            })}
            to="/favourites"
          >
            <div className="icon-container">
              <img
                className={classNames('icon', {
                  'icon--with-amount': favourites.length > 0,
                })}
                src={favouritesImg}
                alt="favourites"
              />
              {favourites.length > 0 && (
                <div className="item-amount">
                  {favourites.length}
                </div>
              )}
            </div>
          </NavLink>
        )}

        <NavLink
          className={classNames('top-bar__option', {
            'cart-is-active': location.pathname.includes('cart'),
          })}
          to="/cart"
        >
          <div className="icon-container">
            <img
              className={classNames('icon', {
                'icon--with-amount': cartPhones.length > 0,
              })}
              src={bag}
              alt="shopping bag"
            />
            {cartPhones.length > 0 && (
              <div className="item-amount">
                {cartPhones.length}
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
