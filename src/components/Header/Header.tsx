import { useContext, useEffect, useMemo, useState } from "react";
import debounce from 'lodash.debounce';
import { StateStore } from "../../store/StoreContext";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import classNames from "classnames";
import { ICONS } from "../../images/icons/icons";
import './Header.scss';

const getLinkLogoClass = ({ isActive }: { isActive: boolean }) => classNames(
  'header__right-side__icon--logo--link', {
    'header__right-side__icon--logo--link--active': isActive,
  },
);


export const Header = () => {
  const { products } = useContext(StateStore);
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const [isQuery, setIsQuery] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    switch (pathname) {
      case '/phones':
        setIsQuery(true);
        setPlaceholder('Search in phones...');
        break;

      case '/tablets':
        setIsQuery(true);
        setPlaceholder('Search in tablets...');
        break;

      case '/accessories':
        setIsQuery(true);
        setPlaceholder('Search in accessories...');
        break;

      case '/favourites':
        setIsQuery(true);
        setPlaceholder('Search in favourites...');
        break;

      default:
        setIsQuery(false);
        setPlaceholder('');
    }

    setQuery(searchParams.get('query') || '');
  }, [pathname]);

  const favourites = products.filter(item => item.addedToFavourites === true);
  const carts = products.filter(item => item.addedToCart === true);

  const debouncedQuery = useMemo(
    () => debounce(
      (value) => {
        if (!value.trim()) {
          searchParams.delete('query');
        } else {
          searchParams.set('query', value.trim());
        }

        setSearchParams(searchParams);
      }, 500,
    ), [searchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);
    debouncedQuery(value);
  }

  const clearQuery = () => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };


  return (
    <header className="header">
      <div className=" header__left-side">
        <Navbar />
      </div>

      <div className="header__right-side">
        {isQuery && (
          <div className="header__right-side__search">
            <input
              type="text"
              className="header__right-side__search--query"
              placeholder={placeholder}
              value={query}
              onChange={handleQueryChange}
            />
            {query.length ? (
              <button
                data-cy="searchDelete"
                type="button"
                className="header__right-side__search--button"
                onClick={clearQuery}
              >
                <img
                  src={ICONS.close}
                  alt="Clear search"
                  className="header__right-side__search--icon"
                />
              </button>
            ) : (
                <img
                  src={ICONS.search}
                  alt="Search"
                  className="header__right-side__search--icon"
                />
            )}
          </div>
        )}

          <div className="header__right-side__icon">
            <NavLink
              to="/favourites"
              className={getLinkLogoClass}
            >
              <img
                src={ICONS.favourites}
                alt="Favourites"
                className="header__right-side__icon--logo"
              />

              {
                !!favourites.length && (
                  <div className="header__right-side__icon__counter">
                    {favourites.length}
                  </div>
                )
              }

            </NavLink>
          </div>

        <div className="header__right-side__icon">
          <NavLink
            to="/cart"
            className={getLinkLogoClass}
          >
            <img
              src={ICONS.cart}
              alt="Cart"
              className="header__right-side__icon--logo"
            />

            {
              !!carts.length && (
                <div className="header__right-side__icon__counter">
                  {carts.length}
                </div>
              )
            }

          </NavLink>
        </div>
      </div>
    </header>
  );
}
