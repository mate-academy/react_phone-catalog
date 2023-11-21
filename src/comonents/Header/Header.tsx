import classNames from 'classnames';
import debounce from 'lodash.debounce';

import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useProducts } from '../ProductContext';
import { getSearchWith } from '../../helpers/utils/getSearchWith';
import { SearchParams } from '../../type/SearchParams';

import './Header.scss';

export const Header = () => {
  const {
    carts,
    favourites,
    selectedProductId,
    query,
    links,
  } = useProducts();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isCartPage = location.pathname === '/cart';
  const isProductDetailsPage = links.some(
    link => location.pathname === `/${link}/${selectedProductId}`,
  );
  const getPlaceholderText = location.pathname.split('/')[1];

  const getLinkClass = (
    { isActive }: { isActive: boolean },
  ) => classNames(
    'navbar__link',
    { 'navbar__link--active': isActive },
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(query);

  const setDebounceSearchWidth = useCallback(
    debounce((paramsToUpdate: SearchParams) => {
      const search = getSearchWith(searchParams, paramsToUpdate);

      setSearchParams(search);
    }, 1000), [searchParams, location.pathname],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedInput = { query: e.target.value || null };

    setInputValue(e.target.value);
    setDebounceSearchWidth(updatedInput);
  };

  const clearInput = () => {
    setSearchParams(getSearchWith(searchParams, { query: null }));
    setInputValue(query);
  };

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-container">
          <NavLink to="/" title="Back to home page">
            <span className="icon icon--logo" />
          </NavLink>
        </div>

        {!isCartPage && (
          <nav className="navbar">
            <NavLink to="/" className={getLinkClass}>
              <p className="navbar__item">
                Home
              </p>
            </NavLink>

            <NavLink to="/phones" className={getLinkClass}>
              <p className="navbar__item">
                Phones
              </p>
            </NavLink>

            <NavLink to="/tablets" className={getLinkClass}>
              <p className="navbar__item">
                Tablets
              </p>
            </NavLink>

            <NavLink to="/accessories" className={getLinkClass}>
              <p className="navbar__item">
                Accessories
              </p>
            </NavLink>
          </nav>
        )}
      </div>

      <div className="header__container">
        {!isCartPage
        && !isHomePage
        && !isProductDetailsPage
        && (
          <label className="header__search-container">
            <input
              type="search"
              placeholder={`Search in ${getPlaceholderText}...`}
              className="header__search"
              value={inputValue}
              onChange={handleInputChange}
            />

            {!inputValue ? (
              <span className="icon icon--search" />
            ) : (
              <button
                onClick={clearInput}
                type="submit"
                title="clear imput"
                className="header__clear-button"
                data-cy="searchDelete"
              >
                <span className="icon icon--cross" />
              </button>
            )}
          </label>
        )}

        {!isCartPage && (
          <NavLink
            to="/favourites"
            className={getLinkClass}
          >
            <div className="navbar__item navbar__item--icon">
              <span className="icon icon--favourites" />
              {favourites.length > 0 && (
                <span className="navbar__quantity">
                  {favourites.length}
                </span>
              )}
            </div>
          </NavLink>
        )}

        <NavLink
          to="/cart"
          className={getLinkClass}
        >
          <div className="navbar__item navbar__item--icon">
            <span className="icon icon--cart" />
            {carts.length > 0 && (
              <span className="navbar__quantity">
                {carts.length}
              </span>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
