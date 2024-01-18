/* eslint-disable react-hooks/exhaustive-deps */
import './Header.scss';
import {
  NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import cn from 'classnames';
import { Navigation } from '../Navigation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addSearch, removeSearch } from '../../features/product/productSlice';
import { getSearchWith } from '../../helpers/searchHelper';
import { categoriesPath, categoriesWithInput } from '../../helpers/constants';
import { Logo } from '../Logo';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const { favourites, cart } = useAppSelector(state => state.phones);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const normalizedPath = pathname.slice(1);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, []);

  useEffect(() => {
    setIsVisible(categoriesWithInput.includes(normalizedPath));
  }, [pathname]);

  const applyQuery = useCallback(
    debounce((e) => dispatch(addSearch(e)), 500), [dispatch],
  );
  const applyQueryURL = useCallback(
    debounce((str) => setSearchParams(
      getSearchWith(searchParams, { query: str || null }),
    ),
    500), [searchParams, setSearchParams],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    setQuery(newQuery);
    if (categoriesPath.includes(normalizedPath)) {
      applyQueryURL(newQuery.trim());
    } else {
      applyQuery(newQuery);
    }
  };

  const handleClear = () => {
    setQuery('');

    if (categoriesPath.includes(normalizedPath)) {
      setSearchParams(getSearchWith(searchParams, { query: null }));
    } else {
      dispatch(removeSearch());
    }
  };

  useEffect(() => () => {
    setQuery('');

    if (!categoriesPath.includes(normalizedPath)) {
      dispatch(removeSearch());
    }
  }, [dispatch, pathname]);

  const isCart = normalizedPath === 'cart';

  return (
    <header className="header">
      <div className="header__left">
        <Logo />

        {!isCart && (
          <Navigation />
        )}
      </div>

      <div className="header__right">
        {isVisible && (
          <div className="header__search">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              className="header__input"
              placeholder={`Search in ${normalizedPath}...`}
            />
            <div className="header__finder-container">
              {query ? (
                <button
                  className="header__finder icon icon-close"
                  type="button"
                  aria-label="find"
                  onClick={handleClear}
                />
              ) : (
                <button
                  className="header__finder icon icon-search"
                  type="button"
                  aria-label="find"
                />
              )}
            </div>
          </div>
        )}

        {!isCart && (
          <NavLink
            to="/favourites"
            className={({ isActive }) => cn('header__favourites', {
              'header__favourites-is-active': isActive,
            })}
          >
            <div className="icon icon-favourites header__favourites-img">
              {!!favourites.length && (
                <div className="header__img-status">
                  {favourites.length}
                </div>
              )}
            </div>
          </NavLink>
        )}

        <NavLink
          to="/cart"
          className={({ isActive }) => cn('header__cart', {
            'header__cart-is-active': isActive,
          })}
        >
          <div className="icon icon-cart header__cart-img">
            {!!cart.length && (
              <div className="header__img-status">
                {cart.length}
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
