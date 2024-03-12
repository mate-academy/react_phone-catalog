import { useState, useContext, useMemo, useEffect } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';

import './index.scss';
import cn from 'classnames';
import { Navbar } from '../Navbar/Navbar';
import { StateStore } from '../../store/StoreContext';
import { ICONS } from '../../images';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';

const getLinkLogoClass = ({ isActive }: { isActive: boolean }) =>
  cn('header__bar-right__icon--logo--link', {
    'header__bar-right__icon--logo--link--active': isActive,
  });

export const Header = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { products } = useContext(StateStore);

  const [query, setQuery] = useState('');
  const [isQuery, setIsQuery] = useState(false);
  const [placeholder, setPlaceholder] = useState('');

  const phones = getProductsByCategory(products, 'phones');
  const tablets = getProductsByCategory(products, 'tablets');
  const accessories = getProductsByCategory(products, 'accessories');
  const favorites = products.filter(item => !!item.addedToFavorites);
  const carts = products.filter(item => !!item.addedToCart);

  useEffect(() => {
    switch (pathname) {
      case '/phones':
        if (phones.length) {
          setIsQuery(true);
          setPlaceholder('Search in phones...');
        } else {
          setIsQuery(false);
        }

        break;

      case '/tablets':
        if (tablets.length) {
          setIsQuery(true);
          setPlaceholder('Search in tablets...');
        } else {
          setIsQuery(false);
        }

        break;

      case '/accessories':
        if (accessories.length) {
          setIsQuery(true);
          setPlaceholder('Search in accessories...');
        } else {
          setIsQuery(false);
        }

        break;

      case '/favorites':
        if (favorites.length) {
          setIsQuery(true);
          setPlaceholder('Search in favourites...');
        } else {
          setIsQuery(false);
        }

        break;

      default:
        setIsQuery(false);
        setPlaceholder('');
    }

    setQuery(searchParams.get('query') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const debouncedQuery = useMemo(
    () =>
      debounce(value => {
        if (!value.trim()) {
          searchParams.delete('query');
        } else {
          searchParams.set('query', value.trim());
        }

        setSearchParams(searchParams);
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams],
  );

  const queryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    debouncedQuery(value);
  };

  const clearQuery = () => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  return (
    <header className="header">
      <div className="header__bar-left">
        <Navbar />
      </div>

      <div className="header__bar-right">
        {isQuery && (
          <div className="header__bar-right__search">
            <input
              type="text"
              className="header__bar-right__search__query"
              placeholder={placeholder}
              value={query}
              onChange={queryChangeHandler}
            />
            {query.length ? (
              <button
                data-cy="searchDelete"
                type="button"
                className="header__bar-right__search--button"
                onClick={clearQuery}
              >
                <img
                  src={ICONS.close}
                  alt="Clear search"
                  className="header__bar-right__search--icon"
                />
              </button>
            ) : (
              <img
                src={ICONS.search}
                alt="Search"
                className="header__bar-right__search--icon"
              />
            )}
          </div>
        )}

        <div className="header__bar-right__icon">
          <NavLink to="/favorites" className={getLinkLogoClass}>
            <img
              src={ICONS.favorite}
              alt="Favourites"
              className="header__bar-right__icon__logo"
            />

            {!!favorites.length && (
              <div className="header__bar-right__icon__counter">
                {favorites.length}
              </div>
            )}
          </NavLink>
        </div>

        <div className="header__bar-right__icon">
          <NavLink to="/cart" className={getLinkLogoClass}>
            <img
              src={ICONS.cart}
              alt="Cart"
              className="header__bar-right__icon__logo"
            />

            {!!carts.length && (
              <div className="header__bar-right__icon__counter">
                {carts.length}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
