import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import * as productAction from '../../../../features/ProductSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Header: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const { favorite, cartItem } = useAppSelector(state => state.selectedProduct);

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
            {favorite.length > 0 ? (
              <NavLink className={getLinkClassButtonFavorite} to="/favorite">
                <span className={style.header__count}>{favorite.length}</span>
              </NavLink>
            ) : (
              <NavLink
                className={getLinkClassButtonFavorite}
                to="/favorite"
              ></NavLink>
            )}

            {cartItem.length > 0 ? (
              <NavLink className={getLinkClassButtonCart} to="/cart">
                <span className={style.header__count}>{cartItem.length}</span>
              </NavLink>
            ) : (
              <NavLink className={getLinkClassButtonCart} to="/cart" />
            )}
          </div>
        </nav>
      </div>
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
