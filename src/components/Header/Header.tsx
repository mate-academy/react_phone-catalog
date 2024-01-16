/* eslint-disable react-hooks/exhaustive-deps */
import './Header.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import cn from 'classnames';
import { Navigation } from '../Navigation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addSearch, removeSearch } from '../../features/product/productSlice';

const categories = ['phones', 'favourites'];

export const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const { favourites, cart } = useAppSelector(state => state.phones);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const applyQuery = useCallback(debounce(
    (e:string) => dispatch(addSearch(e)), 500,
  ), []);

  useEffect(() => {
    setIsVisible(categories.includes(pathname.toString().slice(1)));
  }, [pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    dispatch(removeSearch());
  };

  useEffect(() => {
    return () => {
      setQuery('');
      dispatch(removeSearch());
    };
  }, [dispatch, pathname]);

  const isCart = pathname.slice(1) === 'cart';

  return (
    <header className="header">
      <div className="header__left">
        <Link
          to="/"
          className="header__logo"
        >
          <div className="header__logo-img" />
        </Link>

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
              placeholder={`Search in ${pathname.slice(1)}...`}
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
