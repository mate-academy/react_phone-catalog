/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './Header.scss';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { Nav } from '../Nav';
import { CartContext } from '../CartContext';
import { FavoritesContext } from '../FavoritesContext';
import { getLinkClass } from '../../helpers/getHeaderLinkClass';

export const Header = () => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('query') || '';

  const { cartProducts } = useContext(CartContext);
  const { favoritesProducts } = useContext(FavoritesContext);

  const [countProducts, setCountProducts] = useState(0);
  const [searchText, setSearchText] = useState(search);

  const timerId = useRef(0);

  const inputSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);

    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      if (event.target.value === '') {
        params.delete('query');
      }

      setSearchParams(params);
    }, 300);
  };

  const deleteSearchText = () => {
    setSearchText('');

    const params = new URLSearchParams(searchParams);

    params.delete('query');

    setSearchParams(params);
  };

  useEffect(() => {
    setCountProducts(0);

    cartProducts.forEach(cartProduct => {
      setCountProducts(
        previewCountProducts => previewCountProducts + cartProduct[1],
      );
    });
  }, [cartProducts, searchText]);

  return (
    <div className="header">
      <div className="header__block header__block--padding">
        <div className="header__logo">
          <Link to="/" className="header__link">
            <img src="icons/LOGO.svg" alt="Logo" />
          </Link>
        </div>

        <div
          style={location.pathname.includes('cart') ? { display: 'none' } : {}}
        >
          <Nav />
        </div>
      </div>

      <div className="header__block">
        <div
          className="header__search-element"
          style={
            (location.pathname.includes('phones') ||
              location.pathname.includes('tablets') ||
              location.pathname.includes('accessories') ||
              location.pathname.includes('favorites')) &&
            !location.pathname.split('/')[2]
              ? {}
              : { display: 'none' }
          }
        >
          {searchText.length === 0 ? (
            <div className="header__search-icon icon icon--search" />
          ) : (
            <div
              data-cy="searchDelete"
              className="header__close-icon icon icon--close--black"
              onClick={deleteSearchText}
            />
          )}

          <input
            value={searchText}
            placeholder={`Search in ${location.pathname.slice(1)}...`}
            type="text"
            className="header__search-field"
            onChange={e => inputSearchText(e)}
          />
        </div>

        <NavLink
          style={location.pathname.includes('cart') ? { display: 'none' } : {}}
          to="favorites"
          className={getLinkClass}
        >
          {favoritesProducts.length > 0 && (
            <div className="header__count-icon">{favoritesProducts.length}</div>
          )}
          <div className="icon icon--favorites" />
        </NavLink>

        <NavLink to="/cart" className={getLinkClass}>
          {countProducts > 0 && (
            <div className="header__count-icon">{countProducts}</div>
          )}
          <div className="icon icon--cart" />
        </NavLink>
      </div>
    </div>
  );
};
