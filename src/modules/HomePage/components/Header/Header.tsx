import React, { useEffect } from 'react';
import style from './Header.module.scss';
import * as productAction from '../../../../features/ProductSlice';
import { useAppDispatch } from '../../../shared/hooks/hooks';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Header: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(productAction.fetchProduct());
  }, [pathname, dispatch]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames([style.nav__link], {
      [style.is__active]: isActive,
    });

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
      </div>
      <div className={style.header__menu}>
        <a className={style.header__menu__img} href=""></a>
      </div>
      <div className={style.header__icon}>
        <div className={style.header__wraper}>
          <a
            className={`${style.header__favorit} ${style.header__img}`}
            href=""
          ></a>
        </div>
        <div className={style.header__wraper}>
          <a
            className={`${style.header__cart} ${style.header__img}`}
            href=""
          ></a>
        </div>
      </div>
    </header>
  );
};
