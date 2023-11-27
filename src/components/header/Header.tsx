import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { debounce } from 'lodash';

import './Header.scss';

import { useSearchContext } from '../../context/searchContext/SearchContext';
import { useCartContext } from '../../context/cartContext/CartContext';
import { useFavsContext }
  from '../../context/favouritesContext/FavoritesContext';

import Counter from '../counter/Counter';

import { ReactComponent as Logo } from '../../icons/Logo.svg';
import { ReactComponent as AddToFavourites }
  from '../../icons/Favourites (Heart Like).svg';
import { ReactComponent as AddToCart }
  from '../../icons/Shopping bag (Cart).svg';
import { ReactComponent as Search }
  from '../../icons/Search.svg';
import { ReactComponent as Cross }
  from '../../icons/icons-close.svg';

const Header: React.FC = () => {
  const { setQuery, handleSearch } = useSearchContext();
  const { addedToCart } = useCartContext();
  const { addedToFavs } = useFavsContext();
  const { pathname, search } = useLocation();
  const [inputQuery, setInputQuery] = useState('');
  const [searchParams] = useSearchParams();

  const handleSetQuery = debounce((value: string) => {
    handleSearch(value);
  }, 500);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
    handleSetQuery(event.target.value);
  };

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

  return (
    <section className="header">
      <div className="header-left-container">
        <div className="logo-container">
          <Link to="/">
            <Logo className="logo" />
          </Link>
        </div>

        <div className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => classNames('nav-link', 'home', {
              'is-active': isActive,
            })}
          >
            Home
          </NavLink>

          <NavLink
            to="phones"
            className={({ isActive }) => classNames('nav-link', 'phones', {
              'is-active': isActive,
            })}
          >
            Phones
          </NavLink>

          <NavLink
            to="tablets"
            className={({ isActive }) => classNames('nav-link', 'tablets', {
              'is-active': isActive,
            })}
          >
            Tablets
          </NavLink>

          <NavLink
            to="accessories"
            className={({ isActive }) => classNames('nav-link', 'accessories', {
              'is-active': isActive,
            })}
          >
            Accessories
          </NavLink>
        </div>
      </div>

      <div className="header-right-container">
        {pathname === '/phones' && (
          <div
            className={classNames('header-search', {
              'is-focused': inputQuery.length,
            })}
          >
            <input
              type="text"
              className={classNames('header-search-text', {
                'is-focused': inputQuery.length,
              })}
              placeholder="Search in phones..."
              onChange={handleInputChange}
              value={inputQuery}
            />

            {inputQuery.length
              ? (
                <Cross
                  className="cross-icon"
                  data-cy="searchDelete"
                  onClick={handleRemoveQuery}
                />
              ) : (
                <Search />
              )}
          </div>
        )}

        <div className="header-button-container">
          <NavLink
            to="favourites"
            className={({ isActive }) => classNames('link', {
              'is-active': isActive,
            })}
          >
            {addedToFavs > 0 && <Counter count={addedToFavs} />}
            <AddToFavourites className="header-button" />
          </NavLink>
        </div>

        <div className="header-button-container">
          <NavLink
            to="cart"
            className={({ isActive }) => classNames('link', {
              'is-active': isActive,
            })}
          >
            {addedToCart > 0 && <Counter count={addedToCart} />}
            <AddToCart className="header-button" />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Header;
