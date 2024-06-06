import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { CustomNavLink } from './CustomNavLink';
import { Search } from './Search';

import { useAppSelector } from '../../app/hooks';
import { setSearchWith, debounce } from '../../helper';
import {
  selectFavouritesQuantity,
} from '../../features/favouritesSlices';
import { selectCartQuantity } from '../../features/cartSlices';
import {
  FavouritesIcon,
  ShopIcon,
  Logo,
  BurgerButton,
  DeleteIcon,
} from '../../icons';

import './MainNavigation.scss';

export const MainNavigation: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const quantityFavourites = useAppSelector(selectFavouritesQuantity);
  const quantityCart = useAppSelector(selectCartQuantity);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const openRef = useRef<HTMLElement | null>(null);

  const handleOpenRef = () => {
    if (openRef.current) {
      openRef.current.classList.toggle('aside--open');
    }
  };

  const handleChangeQuery = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchWith(
      searchParams,
      { query: e.target.value || null },
      setSearchParams,
    );
  };

  const applyQuery = useCallback(debounce(
    (e) => handleChangeQuery(e), 1000,
  ), []);

  const newHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    applyQuery(e);
  };

  const handleClearQuery = () => {
    setSearchWith(
      searchParams,
      { query: '' || null },
      setSearchParams,
    );
    setInputValue('');
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <header className="main-header">
      {(windowWidth >= 320 && windowWidth <= 639) ? (
        <nav className="main-header__nav">
          <ul className="main-header__list">
            <li>
              <NavLink to="/">
                <Logo />
              </NavLink>
            </li>
            <li className="main-header__item main-header__item--left">
              <button
                className="main-header__button"
                type="button"
                onClick={handleOpenRef}
              >
                <BurgerButton />
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="main-header__nav">
          <ul className="main-header__list">
            <li>
              <NavLink to="/">
                <Logo />
              </NavLink>
            </li>
            <li className="main-header__item">
              <CustomNavLink to="/" text="Home" />
            </li>
            <li className="main-header__item">
              <CustomNavLink to="/phones" text="Phones" />
            </li>
            <li className="main-header__item">
              <CustomNavLink to="/tablets" text="Tablets" />
            </li>
            <li className="main-header__item">
              <CustomNavLink to="/accessories" text="Accessories" />
            </li>
          </ul>

          <ul className="main-header__list main-header__list--left">
            <Search
              isLocation={location.pathname === '/phones'}
              query={inputValue}
              setQuery={newHandler}
              clearQuery={handleClearQuery}
              placeholder="Search in phones"
            />

            <Search
              isLocation={location.pathname === '/favourites'}
              query={inputValue}
              setQuery={newHandler}
              clearQuery={handleClearQuery}
              placeholder="Search in favourites"
            />

            <Search
              isLocation={location.pathname === '/tablets'}
              query={inputValue}
              setQuery={newHandler}
              clearQuery={handleClearQuery}
              placeholder="Search in tablets"
            />

            <Search
              isLocation={location.pathname === '/accessories'}
              query={inputValue}
              setQuery={newHandler}
              clearQuery={handleClearQuery}
              placeholder="Search in accessories"
            />

            <li className="main-header__item main-header__item--left">
              <NavLink
                to="/favourites"
                className={({ isActive }) => cn(
                  'main-header__link-item',
                  isActive ? 'main-header__active' : '',
                )}
                onClick={handleOpenRef}
              >
                <FavouritesIcon />
                {quantityFavourites > 0 && (
                  <span
                    className="main-header__text"
                  >
                    {quantityFavourites}
                  </span>
                )}
              </NavLink>
            </li>
            <li className="main-header__item main-header__item--left">
              <NavLink
                to="/cart"
                className={({ isActive }) => cn(
                  'main-header__link-item',
                  isActive ? 'main-header__active' : '',
                )}
                onClick={handleOpenRef}
              >
                <ShopIcon />
                {quantityCart > 0 && (
                  <span
                    className="main-header__text"
                  >
                    {quantityCart}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <aside className="aside" ref={openRef}>
        <nav className="main-header__nav">
          <ul className="main-header__list">
            <li>
              <NavLink to="/">
                <Logo />
              </NavLink>
            </li>
            <li className="main-header__item main-header__item--left">
              <button
                className="main-header__button"
                type="button"
                onClick={handleOpenRef}
              >
                <DeleteIcon color="#000" />
              </button>
            </li>
          </ul>
        </nav>

        <nav className="main-header__nav main-header__nav--aside">
          <ul className="main-header__list main-header__list--aside">
            <li className="main-header__item">
              <CustomNavLink
                to="/"
                text="Home"
                onClick={handleOpenRef}
              />
            </li>
            <li className="main-header__item">
              <CustomNavLink
                to="/phones"
                text="Phones"
                onClick={handleOpenRef}
              />
            </li>
            <li className="main-header__item">
              <CustomNavLink
                to="/tablets"
                text="Tablets"
                onClick={handleOpenRef}
              />
            </li>
            <li className="main-header__item">
              <CustomNavLink
                to="/accessories"
                text="Accessories"
                onClick={handleOpenRef}
              />
            </li>
          </ul>
        </nav>

        <div>
          <ul className="aside__bottom-list">
            <li className="main-header__item aside__link">
              <NavLink
                to="/favourites"
                className={({ isActive }) => cn(
                  'main-header__link-item main-header__link-item--footer',
                  isActive ? 'main-header__active' : '',
                )}
                onClick={handleOpenRef}
              >
                <FavouritesIcon />
                {quantityFavourites > 0 && (
                  <span
                    className="main-header__text main-header__text--footer"
                  >
                    {quantityFavourites}
                  </span>
                )}
              </NavLink>
            </li>
            <li className="main-header__item aside__link">
              <NavLink
                to="/cart"
                className={({ isActive }) => cn(
                  'main-header__link-item main-header__link-item--footer',
                  isActive ? 'main-header__active' : '',
                )}
                onClick={handleOpenRef}
              >
                <ShopIcon />
                {quantityCart > 0 && (
                  <span
                    className="main-header__text main-header__text--footer"
                  >
                    {quantityCart}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </header>
  );
};
