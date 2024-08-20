import { useContext, useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash.debounce';
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { StateStore } from '../../store/StoreContext';
import { Navbar } from '../Navbar/Navbar';
import { ICONS } from '../../images/icons/icons';
import './Header.scss';
import { getLinkLogoClass } from '../../helpers/getLinkClass';

export const Header = () => {
  const { products } = useContext(StateStore);
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const [isQuery, setIsQuery] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsMenuOpen(true);
    navigate('/menu');
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (isMenuOpen && pathname === '/menu') {
        handleMenuClose();
      } else {
        handleMenuClick();
      }
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const favourites = products.filter(item => item.addedToFavourites === true);
  const carts = products.filter(item => item.addedToCart === true);

  const debouncedQuery = useMemo(
    () =>
      debounce(
        (value: string) => {
          const updatedSearchParams = new URLSearchParams(searchParams); // Create a new instance

          if (!value.trim()) {
            updatedSearchParams.delete('query');
          } else {
            updatedSearchParams.set('query', value.trim());
          }

          setSearchParams(updatedSearchParams);
        },
        500,
        // Add debounce settings object
        { leading: false, trailing: true },
      ),
    [searchParams, setSearchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          {isMenuOpen && pathname === '/menu' ? (
            <div
              className="header__right-side__icon--menu--close"
              onClick={handleMenuClose}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <img
                src={ICONS.close}
                alt="Close side menu"
                className="pageMenu__bottom__icon--logo"
              />
            </div>
          ) : (
            <NavLink
              to="/menu"
              onClick={handleMenuClick}
              className={getLinkLogoClass}
            >
              <img
                src={ICONS.menu}
                alt="Side menu"
                className="header__right-side__icon--menu"
              />
            </NavLink>
          )}
        </div>

        <div className="header__right-side__icon">
          <NavLink to="/favourites" className={getLinkLogoClass}>
            <img
              src={ICONS.favourites}
              alt="Favourites"
              className="header__right-side__icon--logo"
            />

            {!!favourites.length && (
              <div className="header__right-side__icon__counter">
                {favourites.length}
              </div>
            )}
          </NavLink>
        </div>

        <div className="header__right-side__icon">
          <NavLink to="/cart" className={getLinkLogoClass}>
            <img
              src={ICONS.cart}
              alt="Cart"
              className="header__right-side__icon--logo"
            />

            {!!carts.length && (
              <div className="header__right-side__icon__counter">
                {carts.length}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
