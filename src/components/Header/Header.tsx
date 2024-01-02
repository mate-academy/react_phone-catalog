import React, { useEffect } from 'react';
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

export const Header: React.FC = () => {
  const location = useLocation();
  const {
    cartPhones,
    favourites,
    query,
    setQuery,
  } = useProducts();
  const page = location.pathname.replace('/', '');

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set('query', query);

      if (!newParams.get('query')) {
        newParams.delete('query');
      }

      return newParams;
    });
  }, [query, setSearchParams]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('Filtering by', event.target.value);

    setTimeout(() => {}, 1000);
    setQuery(event.target.value);
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
              <NavLink className={getLinkClass} to="/">
                Home
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink className={getLinkClass} to="/phones">Phones</NavLink>
            </li>
            <li className="list__item">
              <NavLink className={getLinkClass} to="/tablets">Tablets</NavLink>
            </li>
            <li className="list__item">
              <NavLink className={getLinkClass} to="/accessories">
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
          || page === 'accessories') && (
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
                onClick={() => setQuery('')}
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
