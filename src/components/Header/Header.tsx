import { useContext, useState } from 'react';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { MenuItem } from '../../types/MenuItem';
import { CartedProduct } from '../CartContext';
import { getSearchWith } from '../../helpers/searchHelper';
import logo from '../../helpers/img/icons/Logo.svg';
import loop from '../../helpers/img/icons/Search.svg';

type Props = {
  menuItems: MenuItem[];
  toggleMenu: () => void;
};

const serchShownArr = ['phones', 'tablets', 'accessories', 'favorites'];

export const Header: React.FC<Props> = ({ menuItems, toggleMenu }) => {
  const { cartedProducts } = useContext(CartedProduct);
  const { favProducts } = useContext(CartedProduct);
  const totalCarted = cartedProducts.length;
  const totalFav = favProducts.length;
  const location = useLocation();
  const [placeholder, setPlaceholder] = useState(
    location.pathname.slice(1),
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = getSearchWith(
      searchParams, { query: `${e.currentTarget.value}` || '' },
    );

    setSearchParams(newSearchParams);
  };

  const handleClick = () => {
    const newSearchParams = getSearchWith(
      searchParams, { query: '' },
    );

    setSearchParams(newSearchParams);
  };

  return (
    <header id="navbar" className="App__header header">
      <Link to="/" className="header__logo-link">
        <img
          className="header__logo-img"
          src={logo}
          alt="Phones"
        />
      </Link>

      <nav className="header__navbar">
        <ul className="header__menu-list">
          {menuItems.map(item => (
            <li key={item.title} className="header__menu-item">
              <NavLink
                to={item.to}
                className={({ isActive }) => classNames(
                  'header__menu-link',
                  { 'is-active': isActive },
                )}
                onClick={() => setPlaceholder(item.title)}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className="header__burger icon-button"
        aria-label="Mute volume"
        onClick={toggleMenu}
      />

      {serchShownArr.includes(placeholder)
      && (
        <label className="header__search">
          <input
            type="text"
            className="header__search-field"
            placeholder={`Search in ${placeholder}...`}
            value={query}
            onChange={onChangeQuery}
          />
          {query === '' ? (
            <img
              src={loop}
              className="header__search-img"
              alt="search"
            />
          )
            : (
              <button
                type="button"
                aria-label="Mute volume"
                data-cy="searchDelete"
                className="header__search-button"
                onClick={handleClick}
              />
            )}
        </label>
      )}

      <NavLink
        to="/favorites"
        className={({ isActive }) => classNames(
          'header__favorites-link',
          'icon-button',
          { 'is-active': isActive },
        )}
        onClick={() => setPlaceholder('favorites')}
      >
        {totalFav > 0 && (
          <span className="header__total-items">{totalFav}</span>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => classNames(
          'header__cart-link',
          'icon-button',
          { 'is-active': isActive },
        )}
        onClick={() => setPlaceholder('cart')}
      >
        {totalCarted > 0 && (
          <span className="header__total-items">{totalCarted}</span>
        )}
      </NavLink>
    </header>
  );
};
