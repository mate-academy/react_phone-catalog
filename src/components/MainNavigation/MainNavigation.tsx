import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Logo } from '../../icons/Logo';
import './MainNavigation.scss';
import { FavouritesIcon } from '../../icons/FavouritesIcon';
import { ShopIcon } from '../../icons/ShopIcon';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectFavouritesQuantity,
} from '../../features/favouritesSlices/favouritesSlice';
import { selectCartQuantity } from '../../features/cartSlices/cartSlice';
import { CustomNavLink } from './CustomNavLink';
import {
  searchByTitle,
  selectPhones,
} from '../../features/phoneSlice/phonesSlice';

export const MainNavigation = () => {
  const phones = useAppSelector(selectPhones);
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  console.log(query);
  const location = useLocation();
  const quantityFavourites = useAppSelector(selectFavouritesQuantity);
  const quantityCart = useAppSelector(selectCartQuantity);

  const getCheckQuery = (str:string, query1: string) => {
    return str.toUpperCase().includes(query1.toUpperCase().trim());
  };

  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => getCheckQuery(phone.name, query));
  }, [query, phones]);

  const handleSearchPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(searchByTitle(filteredPhones));
  }, [query]);

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
            <li className="main-header__search">
              <input
                className="main-header__input"
                type="text"
                placeholder="Search in phones"
                value={query}
                onChange={handleSearchPhone}
              />
            </li>
            <li className="main-header__link">
              <CustomNavLink
                to="/favourites"
                text={<FavouritesIcon />}
                className="main-header__link main-header__link--left"
              />
              {quantityFavourites > 0 && (
                <span className="main-header__text">{quantityFavourites}</span>
              )}
            </li>
            <li className="main-header__link">
              <CustomNavLink
                to="/cart"
                text={<ShopIcon />}
                className="main-header__link main-header__link--left"
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
