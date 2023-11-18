import {
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  Link,
  NavLink,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import debounce from 'lodash.debounce';
import { ICONS } from '../../icons';
import { getLinkClass, getLinkIcon } from '../../helpers/getLinkClass';
import { GlobalContext } from '../../store/GlobalContext';
import {
  getCartFavorites,
  getCartItems,
} from '../../helpers/getProductsByCategories';
import { getSearchWith } from '../../helpers/searchHelper';
import './Header.scss';

export const Header = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [appliedQuery, setAppliedQuery] = useState<string>('');
  const { localStore } = useContext(GlobalContext);
  const cartItems = getCartItems(localStore);
  const cartFavorits = getCartFavorites(localStore);

  const [isFilter, setIsFilter] = useState(false);
  const [placeHolder, setPlaceHolder] = useState<string>('');

  useEffect(() => {
    setAppliedQuery(query);

    switch (pathname) {
      case '/phones':
        setIsFilter(true);
        setPlaceHolder('Search in phones...');
        break;

      case '/tablets':
        setIsFilter(true);
        setPlaceHolder('Search in tablets...');
        break;

      case '/accessories':
        setIsFilter(true);
        setPlaceHolder('Search in accessories...');
        break;

      case '/favourites':
        setIsFilter(true);
        setPlaceHolder('Search in favourites...');
        break;

      default:
        setIsFilter(false);
    }
  }, [pathname]);

  const debouncedSearch = debounce((value: string) => {
    const search = getSearchWith(searchParams, { query: value || null });

    setSearchParams(search);
  }, 1000);

  const handelQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;

    setAppliedQuery(val);
    debouncedSearch(val);
  };

  function clearFilter() {
    const search = getSearchWith(searchParams, { query: null });

    setSearchParams(search);
    setAppliedQuery('');
  }

  return (
    <header className="header">
      <div className="header__left-side">
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <div className="logo">
                <Link to="/">
                  <img src={ICONS.logo} alt="Logo" className="logo__img" />
                </Link>
              </div>
            </li>

            <li className="nav__item">
              <NavLink to="/" className={getLinkClass}>
                HOME
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink to="/phones" className={getLinkClass}>
                PHONES
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink to="/tablets" className={getLinkClass}>
                TABLETS
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink to="/accessories" className={getLinkClass}>
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__right-side">
        {isFilter && (
          <div className="header__search">
            <input
              type="text"
              className="header__search-input"
              placeholder={placeHolder}
              value={appliedQuery}
              onChange={handelQueryChange}
            />

            <button
              type="button"
              className="button button--clear"
              onClick={() => clearFilter()}
            >
              {appliedQuery ? (
                <img
                  src={ICONS.close_icon}
                  alt="Clear search"
                  data-cy="searchDelete"
                  className="icon icon--hover"
                />
              ) : (
                <img
                  src={ICONS.search_icon}
                  alt="Icon search"
                  className="icon icon--hover"
                />
              )}
            </button>
          </div>
        )}

        <div className="header__icon-box">
          <NavLink
            to="/favourites"
            className={getLinkIcon}
          >
            <div className="header__img-contain header__img-contain--relative">
              <img
                src={ICONS.favourites}
                alt="favourites items"
                className="icon icon--hover"
              />
              {!!cartFavorits.length && (
                <div className="icon icon--count">{cartFavorits.length}</div>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={getLinkIcon}
          >
            <div className="header__img-contain header__img-contain--relative">
              <img
                src={ICONS.shopping_bag}
                alt="My choice"
                className="icon icon--hover"
              />

              {!!cartItems.length && (
                <div className="icon icon--count">{cartItems.length}</div>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
