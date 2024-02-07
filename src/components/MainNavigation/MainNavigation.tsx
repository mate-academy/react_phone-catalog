import { FC, useCallback, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { CustomNavLink } from './CustomNavLink';
import { Search } from './Search';

import { useAppSelector } from '../../app/hooks';
import { setSearchWith, debounce } from '../../helper';
import {
  selectFavouritesQuantity,
} from '../../features/favouritesSlices';
import { selectCartQuantity } from '../../features/cartSlices';
import { FavouritesIcon, ShopIcon, Logo } from '../../icons';

import './MainNavigation.scss';

export const MainNavigation: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const quantityFavourites = useAppSelector(selectFavouritesQuantity);
  const quantityCart = useAppSelector(selectCartQuantity);

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

  return (
    <header className="main-header">
      {location.pathname !== '/cart' ? (
        <nav className="main-header__nav">
          <ul className="main-header__list">
            <li>
              <NavLink to="/">
                <Logo />
              </NavLink>
            </li>
            <li className="main-header__link">
              <CustomNavLink to="/" text="Home" />
            </li>
            <li className="main-header__link">
              <CustomNavLink to="/phones" text="Phones" />
            </li>
            <li className="main-header__link">
              <CustomNavLink to="/tablets" text="Tablets" />
            </li>
            <li className="main-header__link">
              <CustomNavLink to="/accesories" text="Acsesories" />
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
            <li className="main-header__link">
              <CustomNavLink
                to="/favourites"
                text={<FavouritesIcon />}
              />
              {quantityFavourites > 0 && (
                <span className="main-header__text">{quantityFavourites}</span>
              )}
            </li>
            <li className="main-header__link">
              <CustomNavLink
                to="/cart"
                text={<ShopIcon />}
              />
              {quantityCart > 0 && (
                <span className="main-header__text">{quantityCart}</span>
              )}
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
          </ul>

          <ul className="main-header__list main-header__list--left">
            <li className="main-header__link">
              <CustomNavLink
                to="/cart"
                text={<ShopIcon />}
              />
              {quantityCart > 0 && (
                <span className="main-header__text">{quantityCart}</span>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
