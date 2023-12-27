import {
  Link,
  NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import debounce from 'lodash.debounce';
import { ICONS } from '../../images/icons/icons';
import './Header.scss';
import {
  getHeaderLinkIconClass,
  getHeaderNavLinkClass,
} from '../../helpers/getLinkClass';
import { StateStore } from '../../store/StoreContext';

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
          setSearchParams(searchParams);
        } else {
          searchParams.set('query', value.trim());
          setSearchParams(searchParams);
        }
      }, 500,
    ), [],
  );

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="header__left-side">
        <nav className="header__left-side__navigation">
          <ul className="header__left-side__navigation--list">
            <li>
              <Link
                to="/"
                className="header__left-side__navigation--logo--link"
              >
                <img
                  src={ICONS.logo}
                  alt="Logo"
                  className="header__left-side__navigation--logo"
                />
              </Link>
            </li>
            <li className="header__left-side__navigation--item">
              <NavLink
                to="/"
                className={getHeaderNavLinkClass}
              >
                HOME
              </NavLink>
            </li>
            <li className="header__left-side__navigation--item">
              <NavLink
                to="/phones"
                className={getHeaderNavLinkClass}
              >
                PHONES
              </NavLink>
            </li>
            <li className="header__left-side__navigation--item">
              <NavLink
                to="/tablets"
                className={getHeaderNavLinkClass}
              >
                TABLETS
              </NavLink>
            </li>
            <li className="header__left-side__navigation--item">
              <NavLink
                to="/accessories"
                className={getHeaderNavLinkClass}
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__right-side">
        {
          isQuery && (
            <div className="header__right-side__search">
              <input
                type="text"
                className="header__right-side__search--query"
                placeholder={placeholder}
                value={query}
                onChange={onQueryChange}
              />
              {
                query.length
                  ? (
                    <button
                      data-cy="searchDelete"
                      type="button"
                      className="button header__right-side__search--button"
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
                  )
              }
            </div>
          )
        }
        <div className="header__right-side__icon">
          <NavLink
            to="/favourites"
            className={getHeaderLinkIconClass}
          >
            <img
              src={ICONS.favourites}
              alt="Fvourites"
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
            className={getHeaderLinkIconClass}
          >
            <img
              src={ICONS.cart}
              alt="Shopping Cart"
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
};
