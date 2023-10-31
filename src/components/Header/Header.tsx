import {
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  NavLink,
  Link,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import cn from 'classnames';
import { ICONS } from '../../icons';
import { GlobalContext } from '../../Context/GlobalContext';
import { PhoneMenu } from '../PhoneMenu/PhoneMenu';
import './Header.scss';

const getLinkClassLeft = ({ isActive }: { isActive: boolean }) => cn({
  'uppercase-text-style': true,
  nav_link: true,
  'is-active': isActive,
});

const getLinkClassIcons = ({ isActive }: { isActive: boolean }) => cn({
  'header_right-links': true,
  'header_right-links--active': isActive,
});

function getWindowSize() {
  const width = window.innerWidth;

  return width;
}

export const Header = () => {
  const [isFilterAvailable, setIsFilterAvailable] = useState<boolean>(false);
  const [placeHolder, setPlaceHolder] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [appliedQuery, setAppliedQuery] = useState<string>(query);
  const { localStore, setIsMobMenuVisible } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const itemsInCart = localStore.filter(prod => prod.inCart);
  let totalInCart = 0;
  const totalInFav = localStore.filter(prod => prod.inFavourite);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  if (itemsInCart.length > 0) {
    totalInCart = itemsInCart
      .map(prod => prod.count)
      .reduce((a, b) => a + b);
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setAppliedQuery('');
    switch (pathname) {
      case '/phones':
        setIsFilterAvailable(true);
        setPlaceHolder('Search in phones...');
        break;

      case '/tablets':
        setIsFilterAvailable(true);
        setPlaceHolder('Search in tablets...');
        break;

      case '/accessories':
        setIsFilterAvailable(true);
        setPlaceHolder('Search in accessories...');
        break;

      case '/favourites':
        setIsFilterAvailable(true);
        setPlaceHolder('Search in favourites...');
        break;

      default:
        setIsFilterAvailable(false);
    }
  }, [pathname]);

  const timerId = useRef(0);

  const setProductsFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const val = event.currentTarget.value;

    setAppliedQuery(val);

    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      if (params.has('query') && !val) {
        params.delete('query');
        setSearchParams(params);

        return;
      }

      params.set('query', val);
      setSearchParams(params);
    }, 500);
  };

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    setSearchParams(params);
    setAppliedQuery('');
  };

  return (
    <>
      <header className="header">
        <div className="header_left-box">
          {windowSize > 768 ? (
            <>
              <div className="header_logo">
                <Link to="/">
                  <img src={ICONS.logo} alt="Logo" />
                </Link>
              </div>

              <div className="nav">
                <ul className="nav_list">
                  <li className="nav_item">
                    <NavLink to="/" className={getLinkClassLeft}>
                      HOME
                    </NavLink>
                  </li>
                  <li className="nav_item">
                    <NavLink to="/phones" className={getLinkClassLeft}>
                      PHONES
                    </NavLink>
                  </li>
                  <li className="nav_item">
                    <NavLink to="/tablets" className={getLinkClassLeft}>
                      TABLETS
                    </NavLink>
                  </li>
                  <li className="nav_item">
                    <NavLink to="/accessories" className={getLinkClassLeft}>
                      ACCESSORIES
                    </NavLink>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <button
                aria-label="menu"
                type="button"
                className="header_menu"
                onClick={() => setIsMobMenuVisible(v => !v)}
              />
            </>
          )}
        </div>
        <div className="header_right-box">
          {isFilterAvailable && (
            <div className="search">
              <input
                type="text"
                className="search_input btn-text-style"
                placeholder={placeHolder}
                value={appliedQuery}
                onChange={setProductsFilter}
              />
              <button
                type="button"
                className="search_clear"
                onClick={() => clearFilter()}
              >
                {query ? (
                  <img src={ICONS.iconClose} alt="Clear search" />
                ) : (
                  <img src={ICONS.iconSearch} alt="Icon search" />
                )}
              </button>
            </div>
          )}
          <NavLink
            to="/favourites"
            className={getLinkClassIcons}
          >
            <img
              src={ICONS.iconFavorites}
              alt="Icon favourites"
              className="icon"
            />
            {totalInFav.length > 0 && (
              <div className="items-number">{totalInFav.length}</div>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={getLinkClassIcons}
          >
            <img
              src={ICONS.iconCart}
              alt="Icon cart"
              className="icon"
            />
            {totalInCart > 0 && (
              <div className="items-number">{totalInCart}</div>
            )}
          </NavLink>
        </div>
      </header>
      <PhoneMenu />
    </>
  );
};
