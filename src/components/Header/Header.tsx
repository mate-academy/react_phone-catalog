/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import './Header.scss';
import debounce from 'lodash.debounce';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { categoriesPath, categoriesWithInput } from '../../helpers/constants';
import { addSearch, removeSearch } from '../../features/product/productsSlice';
import { getSearchWith } from '../../helpers/searchHelper';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [isFavVisible, setIsFavVisible] = useState(true);
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

    if (normalizedPath === 'favourites') {
      setIsFavVisible(!!favourites.length);
    }

    return () => setIsFavVisible(true);
  }, [pathname, favourites]);

  const applyQuery = useCallback(
    debounce(e => dispatch(addSearch(e)), 500),
    [dispatch],
  );

  const applyQueryURL = useCallback(
    debounce(
      str =>
        setSearchParams(getSearchWith(searchParams, { query: str || null })),
      500,
    ),
    [searchParams, setSearchParams],
  );

  const isCart = normalizedPath === 'cart';

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

  return (
    <header className="header">
      <div className="header__left">
        <Logo />

        {!isCart && <Nav />}
      </div>

      <div className="header__right">
        {isFavVisible && isVisible && (
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
                  aria-label="clear"
                  data-cy="searchDelete"
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
            className={({ isActive }) =>
              classNames('header__favourites', {
                'header__favourites-is-active': isActive,
              })
            }
          >
            <div className="icon icon-favourites header__favourites-img">
              {!!favourites.length && (
                <div className="header__img-status">{favourites.length}</div>
              )}
            </div>
          </NavLink>
        )}

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames('header__cart', {
              'header__cart-is-active': isActive,
            })
          }
        >
          <div className="icon icon-cart header__cart-img">
            {!!cart.length && (
              <div className="header__img-status">{cart.length}</div>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
