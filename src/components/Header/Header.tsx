import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
// eslint-disable-next-line
import { ReactComponent as AddToCart } from '../../assets/icons/Cart.svg';
// eslint-disable-next-line
import { ReactComponent as AddToFavourites } from '../../assets/icons/Favourites (Heart Like).svg';
import { LogoIcon } from '../../assets/icons/logo-icon';
import './Header.scss';
import { PageNavLink } from '../PageNavLink/PageNavLink';
import { SearchIcon } from '../../assets/icons/search-icon';
import { Close } from '../../assets/icons/Close';
import { useSearchContext } from '../../context/searchContext';
import useDebounce from '../../hooks/useDebounce';
import { useCartContext } from '../../context/cartContext';
import { useFavsContext } from '../../context/favouritesContext';
import { Counter } from '../Counter/Counter';

export const Header: React.FC = () => {
  const { addedToCart } = useCartContext();
  const { addedToFavs } = useFavsContext();
  const { pathname } = useLocation();
  const { search } = useLocation();
  const { query, setQuery } = useSearchContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputQuery, setInputQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };

  useDebounce(() => setQuery(inputQuery), 500, [inputQuery]);

  const handleRemoveQuery = () => {
    setQuery('');
    setInputQuery('');
  };

  useEffect(() => {
    const searchQuery = searchParams.get('query');

    if (searchQuery) {
      setInputQuery(searchQuery);
    }
  }, []);

  useEffect(() => {
    if (!search) {
      handleRemoveQuery();
    }
  }, [search]);

  const getParamsFromUrl = () => {
    const searchQuery = searchParams.get('query');

    if (searchQuery) {
      setQuery(searchQuery);
    }
  };

  const setParamsToUrl = () => {
    if (query) {
      searchParams.set('query', query);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('query');
      setSearchParams(searchParams);
    }

    setSearchParams(searchParams);
  };

  const resetSearch = () => {
    setQuery('');
  };

  useEffect(() => {
    getParamsFromUrl();
  }, []);

  useEffect(() => {
    setParamsToUrl();
  }, [query]);

  useEffect(() => {
    if (!search) {
      resetSearch();
    }
  }, [search]);

  return (
    <header className="header">
      <div className="nav">
        <Link to="/" className="logo">
          <LogoIcon />
        </Link>

        <PageNavLink
          to="/"
          className={classNames('link', {
            'is-active': pathname === '/',
          })}
          text="HOME"
        />

        <PageNavLink
          to="phones"
          className={classNames('link', {
            'is-active': pathname === '/phones',
          })}
          text="PHONES"
        />

        <PageNavLink
          to="tablets"
          className={classNames('link', {
            'is-active': pathname === '/tablets',
          })}
          text="TABLETS"
        />

        <PageNavLink
          to="accessories"
          className={classNames('link', {
            'is-active': pathname === '/accessories',
          })}
          text="ACCESSORIES"
        />
      </div>

      <div className="icons">
        {(
          pathname === '/phones'
          || pathname === '/tablets'
          || pathname === '/accessories'
        ) && (
          <div
            className={classNames('search', {
              'is-focused': inputQuery.length,
            })}
          >
            <input
              type="text"
              className={classNames('search__text', {
                'is-focused': inputQuery.length,
              })}
              placeholder={`Search in ${pathname.replace('/', '')}...`}
              onChange={handleInputChange}
              value={inputQuery}
            />

            {inputQuery.length
              ? (
                <button
                  type="button"
                  data-cy="searchDelete"
                  onClick={handleRemoveQuery}
                  className="closeicon"
                >
                  <Close />
                </button>
              ) : (
                <SearchIcon />
              )}
          </div>
        )}
        <div className="buttons_container">
          <NavLink
            to="favorites"
            className={({ isActive }) => classNames('navlink', {
              'is-actived': isActive,
            })}
          >
            {addedToFavs > 0 && <Counter count={addedToFavs} />}
            <AddToFavourites className="buttons" />

          </NavLink>
        </div>

        <div className="buttons_container">
          <NavLink
            to="cart"
            className={({ isActive }) => classNames('navlink', {
              'is-actived': isActive,
            })}
          >
            {addedToCart > 0 && <Counter count={addedToCart} />}
            <AddToCart className="buttons" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
