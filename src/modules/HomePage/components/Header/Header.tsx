import React, { useCallback, useEffect, useState } from 'react';
import style from './Header.module.scss';
import * as productAction from '../../../../features/ProductSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
const page = ['phones', 'tablets', 'accessories'];

export const Header: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const { favorite, cartItem } = useAppSelector(state => state.selectedProduct);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearhQuery] = useState('');
  const countCartItem = cartItem.reduce((acm, item) => acm + item.quantity, 0);
  const isSearchInUrl = page.some(item => {
    if (pathname.length > 12) {
      return false;
    }

    return pathname.includes(item);
  });

  useEffect(() => {
    dispatch(productAction.fetchProduct());
  }, [pathname, dispatch]);

  useEffect(() => {
    setIsOpenMenu(true);
  }, [pathname, dispatch]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames([style.nav__link], {
      [style.is__active]: isActive,
    });

  const getLinkClassButtonCart = ({ isActive }: { isActive: boolean }) =>
    classNames([style.header__cart, style.header__img, style.header__wraper], {
      [style.is__active__button]: isActive,
    });

  const getLinkClassButtonFavorite = ({ isActive }: { isActive: boolean }) =>
    classNames(
      [style.header__favorit, style.header__img, style.header__wraper],
      {
        [style.is__active__button]: isActive,
      },
    );

  const scrollFix = () => {
    const menu = document.getElementById('menu');

    if (isOpenMenu && menu) {
      menu.style.overflow = 'hidden';
    } else {
      if (menu) {
        menu.style.overflow = 'scroll';
      }
    }

    setIsOpenMenu(!isOpenMenu);
  };

  const applyQuery = useCallback(debounce(setSearchParams, 1000), [debounce]);
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.set('query', e.target.value);

    if (e.target.value.trim() === '') {
      params.delete('query');
    }

    setSearhQuery(e.target.value);
    applyQuery(params);
  };

  const closeSearch = () => {
    setSearhQuery('');
    setSearchParams('');
    setIsSearch(false);
  };

  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <div className={style.nav__logo}>
          <Link className={style.nav__img} to="/">
            <img
              className={style.nav__logo__img}
              src={`${'https://allaserhiienko.github.io/react_phone-catalog//img/icons/logo.svg'}`}
              alt="Logo"
            />
          </Link>
        </div>
        <nav
          className={classNames(style.header__nav, {
            [style.header__active]: isOpenMenu,
          })}
        >
          <ul className={style.nav}>
            <li className={style.nav__item}>
              <NavLink to="/" className={getLinkClass}>
                HOME
              </NavLink>
            </li>
            <li className={style.nav__item}>
              <NavLink to="/phones" className={getLinkClass}>
                PHONES
              </NavLink>
            </li>
            <li className={style.nav__item}>
              <NavLink to="/tablets" className={getLinkClass}>
                TABLETS
              </NavLink>
            </li>
            <li className={style.nav__item}>
              <NavLink to="/accessories" className={getLinkClass}>
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
          <div className={style.header__icon}>
            {isSearchInUrl && (
              <>
                {!isSearch && (
                  <button
                    onClick={() => setIsSearch(true)}
                    className={`${style.nav__button} ${style.nav__button__small}`}
                  />
                )}
                {isSearch && (
                  <div className={style.nav__wraper}>
                    <input
                      onChange={handleQuery}
                      placeholder="Search.."
                      value={searchQuery}
                      className={style.nav__query}
                      type="text"
                      onBlur={() => setIsSearch(false)}
                    />
                    <button
                      onClick={closeSearch}
                      className={style.nav__close}
                    />
                  </div>
                )}
              </>
            )}
            {!isSearch && (
              <>
                {favorite.length > 0 ? (
                  <NavLink
                    className={getLinkClassButtonFavorite}
                    to="/favorite"
                  >
                    <span className={style.header__count}>
                      {favorite.length}
                    </span>
                  </NavLink>
                ) : (
                  <NavLink
                    className={getLinkClassButtonFavorite}
                    to="/favorite"
                  ></NavLink>
                )}

                {cartItem.length > 0 ? (
                  <NavLink className={getLinkClassButtonCart} to="/cart">
                    <span className={style.header__count}>
                      {countCartItem}
                    </span>
                  </NavLink>
                ) : (
                  <NavLink className={getLinkClassButtonCart} to="/cart" />
                )}
              </>
            )}
          </div>
        </nav>
      </div>
      {isSearchInUrl && (
        <>
          {!isSearch && (
            <button
              onClick={() => setIsSearch(true)}
              className={`${style.nav__button} ${style.nav__small}`}
            />
          )}
          {isSearch && (
            <div className={style.nav__wraper__small}>
              <input
                onChange={handleQuery}
                placeholder="Search.."
                value={searchQuery}
                className={style.nav__query}
                type="text"
                onBlur={() => setIsSearch(false)}
              />
              <button onClick={closeSearch} className={style.nav__close} />
            </div>
          )}
        </>
      )}

      <div className={style.header__menu}>
        {isOpenMenu ? (
          <button onClick={scrollFix} className={style.header__menu__img} />
        ) : (
          <button onClick={scrollFix} className={style.header__menu__close} />
        )}
      </div>
    </header>
  );
};
