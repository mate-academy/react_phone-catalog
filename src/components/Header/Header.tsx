import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { CartIcon } from '../../assets/icons/cart-icon';
import { FavouritesIcon } from '../../assets/icons/favourites-icon';
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

export const Header: FC = () => {
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
        <Link
          to="favorites"
          className="navlink"
        >
          {addedToFavs > 0 && <Counter count={addedToFavs} />}
          <div className="buttoncontainer">
            <FavouritesIcon />
          </div>
        </Link>

        <Link
          to="cart"
          className="navlink"
        >
          {addedToCart > 0 && <Counter count={addedToCart} />}
          <div className="buttoncontainer">
            <CartIcon />
          </div>
        </Link>
      </div>
    </header>
  );
};
